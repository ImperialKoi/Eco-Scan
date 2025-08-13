import { Link } from 'react-router-dom';
import { Scan, Database, TreePine, Globe, ArrowRight, CheckCircle, Shield } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-600 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-36">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Discover the Environmental Impact of Your Favorite Brands
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Use our advanced scanning technology to instantly assess the sustainability 
              practices of companies through their logos or QR codes.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 bg-white text-green-700 rounded-lg hover:bg-green-100 transition-colors text-lg font-semibold"
            >
              Start Scanning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 justify-items-center">
        <div className="container px-4 md:px-6 pb-16">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-white px-2.5 py-2 text-sm font-semibold text-white">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Sustainability at Your Fingertips</h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed">
                Our scanner makes it easy to identify sustainable companies and products with just a quick scan.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-green-100 text-green-800 p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3">
                <Scan className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Instant Scanning</h3>
              <p className="text-center text-gray-600">
                Quickly scan any company logo or QR code to get immediate sustainability information.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4 rounded-lg bg-green-100 text-green-800 p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Detailed Reports</h3>
              <p className="text-center text-gray-600">
                Get comprehensive sustainability metrics and ratings for each company you scan.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4 rounded-lg bg-green-100 text-green-800 p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Verified Data</h3>
              <p className="text-center text-gray-600">
              Our sustainability data is sourced from trusted environmental organizations and certifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-300 mb-2">10,000+</div>
              <div className="text-gray-300">Companies Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-300 mb-2">50M+</div>
              <div className="text-gray-300">Scans Performed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-300 mb-2">85%</div>
              <div className="text-gray-300">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="w-full py-12 justify-items-center pt-24 p-4">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold bg-white text-green-700">
                How It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Simple. Fast. Informative.</h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed">
                Three easy steps to make more sustainable choices every day.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            {[["Scan", "Point your camera at any company logo or QR code on a product."],
              ["Process", "Our system identifies the company and retrieves sustainability data."],
              ["Learn", "View detailed sustainability metrics and make informed decisions."]]
              .map(([title, desc], i) => (
                <div key={title} className="flex flex-col items-center space-y-4 text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-center text-gray-300">{desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-800 rounded-2xl p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <Globe className="h-16 w-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Make Sustainable Choices?
              </h2>
              <p className="text-green-200 mb-8">
                Join thousands of conscious consumers using EcoScan to make 
                environmentally responsible purchasing decisions.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-white text-green-800 rounded-lg hover:bg-green-100 transition-colors text-lg font-semibold"
              >
                Try EcoScan Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;