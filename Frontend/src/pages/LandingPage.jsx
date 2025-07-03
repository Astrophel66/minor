import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Headphones, 
  UserCheck, 
  FolderOpen, 
  Smartphone,
  ArrowRight,
  RefreshCw,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: RefreshCw,
      title: 'Real-time Collaboration',
      description: ' share notes, and work together seamlessly with your study partners.'
    },
    {
      icon: Headphones,
      title: 'Customizable Environments',
      description: 'Pomodoro timers to optimize your study sessions.'
    },
    {
      icon: Users,
      title: 'Study Rooms',
      description: 'Create study spaces for group sessions or solo focus time.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-teal-50 to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-amber-900">StudySpace</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-amber-800 hover:text-amber-900 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-amber-600 to-teal-600 text-white px-6 py-2 rounded-full hover:from-amber-700 hover:to-teal-700 transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-amber-900 mb-6">
            Study Smarter,{' '}
            <span className="bg-gradient-to-r from-amber-700 to-teal-700 bg-clip-text text-transparent">
              Together
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 mb-12 max-w-3xl mx-auto leading-relaxed">
            Collaborate, focus, and succeed with distraction-free virtual study spaces designed for modern learners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/register"
              className="bg-gradient-to-r from-amber-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-amber-700 hover:to-teal-700 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="border-2 border-amber-700/30 text-amber-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-100/50 transition-all">
              Explore Features
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/40 hover:bg-white/70 transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-4">{feature.title}</h3>
              <p className="text-amber-800 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-white/60 backdrop-blur-md rounded-3xl p-12 border border-white/40 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
            Ready to boost your productivity?
          </h2>
          <p className="text-xl text-amber-800 mb-8">
            Join thousands of students already studying smarter with StudySpace.
          </p>
          <Link 
            to="/register"
            className="bg-gradient-to-r from-amber-600 to-teal-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:from-amber-700 hover:to-teal-700 transition-all transform hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Sign Up Now</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-amber-900/20 backdrop-blur-md border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-amber-900">StudySpace</span>
              </div>
              <p className="text-amber-800 max-w-md">
                Empowering students worldwide with collaborative study tools and distraction-free environments.
              </p>
            </div>
            <div>
              <h4 className="text-amber-900 font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-amber-800">
                <li><a href="#" className="hover:text-amber-900 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-amber-900 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-amber-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-900 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-amber-900 font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-amber-800 hover:text-amber-900 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-amber-800 hover:text-amber-900 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-amber-800 hover:text-amber-900 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-700/20 mt-8 pt-8 text-center text-amber-800">
            <p>&copy; 2024 StudySpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;