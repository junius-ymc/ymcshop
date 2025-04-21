// components/admin/DashboardStatCards.jsx
import React from "react";
import { BarChart, ShoppingCart, Users, Mail, MessageSquareDiff } from "lucide-react";

const DashboardStatCards = ({ stats }) => {
  return (
    <div className="admin-dashboard-stats-grid">
      <div className="admin-dashboard-stat-card">
        <div className="stat-icon bg-blue-500">
          <ShoppingCart />
        </div>
        {stats.ordersToday > 0 && (
          <div className="absolute">
            <div className="absolute admin-notifycart-1">{stats.ordersToday}</div>
          </div>
        )}
        <div className="stat-text">
          <h4>Orders</h4>
          <p>{stats.totalOrders}</p>
        </div>
      </div>
      <div className="admin-dashboard-stat-card">
        <div className="stat-icon bg-green-500">
          <Users />
        </div>
        {stats.usersToday > 0 && (
          <div className="absolute">
            <div className="absolute admin-notifycart-1">{stats.usersToday}</div>
          </div>
        )}
        <div className="stat-text">
          <h4>Users</h4>
          <p>{stats.totalUsers}</p>
        </div>
      </div>
      <div className="admin-dashboard-stat-card">
        <div className="stat-icon bg-yellow-500">
          <BarChart />
        </div>
        <div className="stat-text">
          <h4>Products</h4>
          <p>{stats.totalProducts}</p>
        </div>
      </div>
      <div className="admin-dashboard-stat-card">
        <div className="stat-icon bg-red-500">
          <Mail />
        </div>
        {stats.contactsToday > 0 && (
          <div className="absolute">
            <div className="absolute admin-notifycart-1">{stats.contactsToday}</div>
          </div>
        )}
        <div className="stat-text">
          <h4>Contacts</h4>
          <p>{stats.totalContacts}</p>
        </div>
      </div>
      <div className="admin-dashboard-stat-card">
        <div className="stat-icon bg-sky-500">
          <MessageSquareDiff />
        </div>
        {stats.reviewsToday > 0 && (
          <div className="absolute">
            <div className="absolute admin-notifycart-1">{stats.reviewsToday}</div>
          </div>
        )}
        <div className="stat-text">
          <h4>Reviews</h4>
          <p>{stats.totalReviews}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCards;
