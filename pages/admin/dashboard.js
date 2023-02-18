import Link from 'next/link';
import React, { useReducer } from 'react';
import Layout from '../../components/Layout';

export default function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });
  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard" className="font-bold">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link href="/admin/products">Products</Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h1 className="mb-4 text-xl">Admin Dashboard</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.ordersPrice}</p>
                  <p>Sales</p>
                  <Link href="/admin/orders">View sales</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.ordersCount}</p>
                  <p>Orders</p>
                  <Link href="/admin/orders">View orders</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.productsCount}</p>
                  <p>Products</p>
                  <Link href="/admin/products">View products</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.usersCount}</p>
                  <p>Users</p>
                  <Link href="/admin/products">View users</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
