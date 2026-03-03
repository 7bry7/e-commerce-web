import { useNavigate } from 'react-router';
import { useStore } from '../store';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle2, TrendingUp, Zap, Shield } from 'lucide-react';

export default function BecomeSellerPage() {
  const navigate = useNavigate();
  const requestSellerAccess = useStore((state) => state.requestSellerAccess);
  const user = useStore((state) => state.user);

  const handleRequestAccess = () => {
    requestSellerAccess();
    navigate('/creator');
  };

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      title: 'Earn Money',
      description: 'Sell your digital products and earn income from your creativity',
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      title: 'Instant Setup',
      description: 'Get started immediately with our easy-to-use seller dashboard',
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      title: 'Secure Payments',
      description: 'We handle all payment processing securely and reliably',
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      title: 'Full Control',
      description: 'Manage your products, pricing, and sales analytics',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Become a Seller
          </h1>
          <p className="text-xl text-gray-600">
            Start selling your digital products today and reach thousands of buyers
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-gray-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {benefit.icon}
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Card */}
        <Card className="border-emerald-200 bg-emerald-50">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Ready to Start Selling?</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Get instant access to your seller dashboard and start uploading products
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Button
              onClick={handleRequestAccess}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg"
            >
              Request Seller Access
            </Button>
            <p className="text-sm text-gray-500">
              Logged in as: <span className="font-medium">{user?.email}</span>
            </p>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Once approved, you'll have access to the seller dashboard where you can
            upload products, track sales, and manage your storefront.
          </p>
        </div>
      </div>
    </div>
  );
}
