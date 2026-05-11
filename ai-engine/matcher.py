import re
from difflib import SequenceMatcher
import logging

logger = logging.getLogger(__name__)

class ClassMatcher:
    """Smart matching of member classes across different insurance companies"""
    
    def __init__(self):
        # Common class name patterns
        self.class_patterns = {
            'employee': ['employee', 'staff', 'worker', 'principal', 'main member'],
            'spouse': ['spouse', 'wife', 'husband', 'partner'],
            'child': ['child', 'children', 'kid', 'son', 'daughter', 'dependent child'],
            'dependent': ['dependent', 'dependant', 'family member'],
            'parent': ['parent', 'father', 'mother']
        }
    
    def normalize_class_name(self, class_name):
        """Normalize class name for comparison"""
        normalized = class_name.lower().strip()
        normalized = re.sub(r'[^a-z0-9\s]', '', normalized)
        normalized = re.sub(r'\s+', ' ', normalized)
        return normalized
    
    def get_class_category(self, class_name):
        """Determine the category of a class name"""
        normalized = self.normalize_class_name(class_name)
        
        for category, patterns in self.class_patterns.items():
            for pattern in patterns:
                if pattern in normalized or normalized in pattern:
                    return category
        
        return 'other'
    
    def calculate_similarity(self, name1, name2):
        """Calculate similarity score between two class names"""
        norm1 = self.normalize_class_name(name1)
        norm2 = self.normalize_class_name(name2)
        
        # Direct match
        if norm1 == norm2:
            return 1.0
        
        # Category match
        cat1 = self.get_class_category(name1)
        cat2 = self.get_class_category(name2)
        if cat1 == cat2 and cat1 != 'other':
            return 0.9
        
        # Fuzzy string matching
        return SequenceMatcher(None, norm1, norm2).ratio()
    
    def match_classes(self, quotations):
        """Match classes across multiple quotations"""
        try:
            if len(quotations) < 2:
                return []
            
            # Extract all unique class names
            all_classes = {}
            for quotation in quotations:
                company_id = quotation['id']
                company_name = quotation['companyName']
                
                for member_class in quotation['memberClasses']:
                    class_name = member_class['className']
                    category = self.get_class_category(class_name)
                    
                    if category not in all_classes:
                        all_classes[category] = []
                    
                    all_classes[category].append({
                        'companyId': company_id,
                        'companyName': company_name,
                        'className': class_name,
                        'memberCount': member_class['memberCount'],
                        'pricePerMember': member_class['pricePerMember'],
                        'totalPrice': member_class['totalPrice']
                    })
            
            # Create matched groups
            matched_groups = []
            for category, classes in all_classes.items():
                if len(classes) > 0:
                    # Calculate average price per member for this category
                    total_price = sum(c['pricePerMember'] for c in classes)
                    avg_price = total_price / len(classes) if classes else 0
                    
                    # Find min and max prices
                    prices = [c['pricePerMember'] for c in classes]
                    min_price = min(prices) if prices else 0
                    max_price = max(prices) if prices else 0
                    
                    # Calculate price differences
                    for cls in classes:
                        cls['priceDifference'] = cls['pricePerMember'] - avg_price
                        cls['pricePercentDiff'] = ((cls['pricePerMember'] - avg_price) / avg_price * 100) if avg_price > 0 else 0
                    
                    matched_groups.append({
                        'category': category,
                        'classes': classes,
                        'averagePrice': round(avg_price, 2),
                        'minPrice': round(min_price, 2),
                        'maxPrice': round(max_price, 2),
                        'priceRange': round(max_price - min_price, 2)
                    })
            
            # Sort by category
            category_order = ['employee', 'spouse', 'child', 'dependent', 'parent', 'other']
            matched_groups.sort(key=lambda x: category_order.index(x['category']) if x['category'] in category_order else 999)
            
            logger.info(f"Matched {len(matched_groups)} class categories")
            return matched_groups
            
        except Exception as e:
            logger.error(f"Matching error: {str(e)}")
            return []
    
    def find_best_match(self, target_class, candidate_classes, threshold=0.7):
        """Find the best matching class from candidates"""
        best_match = None
        best_score = 0
        
        for candidate in candidate_classes:
            score = self.calculate_similarity(target_class, candidate['className'])
            if score > best_score and score >= threshold:
                best_score = score
                best_match = candidate
        
        return best_match, best_score
