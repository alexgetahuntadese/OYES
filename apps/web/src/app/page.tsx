import { Header } from '../components/layout/header';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            O-YES EMIS
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Enterprise Management Information System
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Executive Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Real-time analytics and KPI monitoring</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Project Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Track programmes, activities, and budgets</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Beneficiary Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Secure beneficiary data with GPS tracking</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Finance & Grants</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Multi-currency financial tracking</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>HR Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Staff and volunteer coordination</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>GRC & Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Risk management and audit trails</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
