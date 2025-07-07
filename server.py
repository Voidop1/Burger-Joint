
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import sys

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom logging to show requests
        print(f"📡 {self.address_string()} - {format % args}")

def run_server():
    try:
        port = 5000
        server_address = ('0.0.0.0', port)
        httpd = HTTPServer(server_address, MyHTTPRequestHandler)
        print(f"🌟 Life Analytics & Personality Insights Server running at http://0.0.0.0:{port}")
        print(f"📱 Access your application at the URL above!")
        print(f"🔮 Ready to reveal life secrets...")
        print(f"📁 Serving files from: {os.getcwd()}")
        httpd.serve_forever()
    except OSError as e:
        print(f"❌ Error starting server: {e}")
        print(f"💡 Make sure port {port} is not already in use")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n🛑 Server stopped gracefully")
        httpd.server_close()
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Change to the directory containing the HTML files
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        os.chdir(script_dir)
        print(f"📂 Working directory: {script_dir}")
        
        # Check if required files exist
        required_files = ['index.html', 'style.css', 'script.js']
        missing_files = [f for f in required_files if not os.path.exists(f)]
        
        if missing_files:
            print(f"⚠️  Warning: Missing files: {', '.join(missing_files)}")
        
        run_server()
    except Exception as e:
        print(f"❌ Error initializing server: {e}")
        sys.exit(1)
