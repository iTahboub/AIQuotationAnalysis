from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from local_analyzer import LocalQuotationAnalyzer  # Use local analyzer
from matcher import ClassMatcher
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize analyzer and matcher - NO API KEY NEEDED!
analyzer = LocalQuotationAnalyzer()
matcher = ClassMatcher()

# Configuration
UPLOAD_FOLDER = 'temp_uploads'
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {'pdf'}

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'message': 'AI Engine is running',
        'model': 'local-analyzer (no API required)'
    })

@app.route('/analyze', methods=['POST'])
def analyze_quotation():
    """Analyze uploaded PDF quotation"""
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No file provided'
            }), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No file selected'
            }), 400

        if not allowed_file(file.filename):
            return jsonify({
                'success': False,
                'error': 'Only PDF files are allowed'
            }), 400

        # Save file temporarily
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        logger.info(f"Analyzing file: {file.filename}")

        # Analyze the PDF
        result = analyzer.analyze_pdf(file_path)

        # Clean up temporary file
        if os.path.exists(file_path):
            os.remove(file_path)

        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 500

    except Exception as e:
        logger.error(f"Analysis error: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/match-classes', methods=['POST'])
def match_classes():
    """Match member classes across different quotations"""
    try:
        data = request.get_json()

        if not data or 'quotations' not in data:
            return jsonify({
                'success': False,
                'error': 'No quotations provided'
            }), 400

        quotations = data['quotations']

        if len(quotations) < 2:
            return jsonify({
                'success': False,
                'error': 'At least 2 quotations required for comparison'
            }), 400

        logger.info(f"Matching classes for {len(quotations)} quotations")

        # Perform smart matching
        matched_classes = matcher.match_classes(quotations)

        return jsonify({
            'success': True,
            'matchedClasses': matched_classes
        }), 200

    except Exception as e:
        logger.error(f"Matching error: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.errorhandler(413)
def request_entity_too_large(error):
    return jsonify({
        'success': False,
        'error': 'File too large. Maximum size is 10MB'
    }), 413

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)
