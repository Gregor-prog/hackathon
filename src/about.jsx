import { HeartPulse, Cpu, Thermometer, Wifi, AlertCircle, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white p-8 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-gray-900">
          VitalSense
        </h1>
        <p className="text-xl text-gray-600">
          Smart Health Monitoring System
        </p>
      </div>

      {/* Introduction Section */}
      <section className="space-y-6 border-b pb-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Real-Time Health Insights</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Continuous monitoring of vital parameters through advanced IoT technology, 
            bridging the gap between personal health and medical-grade diagnostics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <HeartPulse className="w-8 h-8 mb-4 text-gray-900" />
            <h3 className="text-xl font-semibold mb-2">Core Parameters</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Heart Rate (BPM)</li>
              <li>• Blood Oxygen (SpO2)</li>
              <li>• Body Temperature</li>
            </ul>
          </div>

          <div className="p-6 border rounded-lg">
            <Cpu className="w-8 h-8 mb-4 text-gray-900" />
            <h3 className="text-xl font-semibold mb-2">Technical Edge</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• ESP32 Microcontroller</li>
              <li>• Wi-Fi/Bluetooth LE</li>
              <li>• Low-Power Design</li>
            </ul>
          </div>

          <div className="p-6 border rounded-lg">
            <AlertCircle className="w-8 h-8 mb-4 text-gray-900" />
            <h3 className="text-xl font-semibold mb-2">Smart Alerts</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Abnormal Value Detection</li>
              <li>• Historical Trend Analysis</li>
              <li>• Emergency Notifications</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sensor Details */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900">Core Technology</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 border rounded-lg space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 border rounded-full">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">MAX30102 Sensor</h3>
            </div>
            <p className="text-gray-600">
              Medical-grade optical sensor using photoplethysmography (PPG) to 
              non-invasively measure heart rate and blood oxygen saturation 
              through light absorption analysis.
            </p>
          </div>

          <div className="p-6 border rounded-lg space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 border rounded-full">
                <Thermometer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">DS18B20 Sensor</h3>
            </div>
            <p className="text-gray-600">
              High-precision digital temperature sensor with waterproof design, 
              providing ±0.5°C accuracy across -10°C to +85°C range.
            </p>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="space-y-8 border-t pt-12">
        <h2 className="text-3xl font-bold text-gray-900">Future Evolution</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-6 border-2 border-dashed rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <Zap className="w-6 h-6 text-gray-900" />
              <h3 className="text-lg font-semibold">AI Integration</h3>
            </div>
            <p className="text-gray-600">
              Predictive health analytics using machine learning models trained 
              on physiological patterns.
            </p>
          </div>

          <div className="p-6 border-2 border-dashed rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <Wifi className="w-6 h-6 text-gray-900" />
              <h3 className="text-lg font-semibold">Smart Ecosystem</h3>
            </div>
            <p className="text-gray-600">
              Integration with smart home devices and emergency response systems.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pt-12">
        <button className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
          Explore Documentation
        </button>
      </div>
    </div>
  );
}