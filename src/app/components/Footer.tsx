import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Marketplace</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="#" className="text-base text-slate-400 hover:text-white">3D Models</Link></li>
              <li><Link to="#" className="text-base text-slate-400 hover:text-white">Textures</Link></li>
              <li><Link to="#" className="text-base text-slate-400 hover:text-white">HDRIs</Link></li>
              <li><Link to="#" className="text-base text-slate-400 hover:text-white">Plugins</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="#" className="text-base text-slate-400 hover:text-white">Help Center</Link></li>
              <li><Link to="#" className="text-base text-slate-400 hover:text-white">Licensing</Link></li>
              <li><Link to="#" className="text-base text-slate-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="#" className="text-base text-slate-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Community</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="#" className="text-base text-slate-400 hover:text-white">Blog</Link></li>
              <li><Link to="#" className="text-base text-slate-400 hover:text-white">Forum</Link></li>
              <li><Link to="#" className="text-base text-slate-400 hover:text-white">Discord</Link></li>
              <li><Link to="#" className="text-base text-slate-400 hover:text-white">Events</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Newsletter</h3>
            <p className="mt-4 text-base text-slate-400">
              The latest assets, sent to your inbox weekly.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none min-w-0 w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-4 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:placeholder-slate-400"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-emerald-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-slate-900"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {/* Social icons could go here */}
          </div>
          <p className="mt-8 text-base text-slate-400 md:mt-0 md:order-1">
            &copy; 2024 RhineFront, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
