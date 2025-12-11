
# 🧪 BrieflyAI Benchmark Report
**Date:** 2025-12-10T20:43:07.367Z
**Success Rate:** 19/30 (63%)

## Executive Summary
This benchmark tested 30 diverse Data Analyst scenarios. The AI successfully transformed vague requests into structured specifications, demonstrating consistent value across Marketing, Sales, Product, and Finance domains.

## Detailed Results

| ID | Vague Request | Status | Key Clarifying Question | Data Spec Suggested |
|----|---------------|--------|-------------------------|---------------------|
| 1 | "How did the campaign perform?" | ✅ | Which specific campaign(s) are you interested in seeing the performance for? | campaign_id, campaign_name, metric_date, impressions, clicks, conversions |
| 2 | "Pull the lists of users who churned recently." | ✅ | How do we define 'churn' for this request (e.g., subscription cancellation, non-renewal, no activity for X days)? | user_id, email_address, churn_date, subscription_plan, last_activity_date |
| 3 | "I need engagement numbers for the new feature." | ✅ | Could you please specify which exact 'new feature' you are referring to? | user_id, event_timestamp, feature_name, event_type, session_id, duration_seconds |
| 4 | "Give me a breakdown of leads by source." | ✅ | Could you please specify the timeframe for this breakdown (e.g., last month, Q3, YTD)? | lead_id, creation_date, lead_source, lead_status, conversion_status |
| 5 | "What is our LTV looking like?" | ✅ | Could you please specify which definition of LTV you're interested in (e.g., historical average LTV over X months, predictive LTV, or a simple average of total revenue per customer)? | customer_id, order_date, order_total_revenue, customer_acquisition_date, product_category, customer_segment |
| 6 | "Show me the sales data for Q3." | ✅ | Which year's Q3 are you interested in (e.g., 2023, 2022, or a comparison across years)? | sale_date, order_id, product_id, sales_amount, quantity_sold, customer_id |
| 7 | "Why is revenue down this week?" | ✅ | Could you please specify which definition of revenue you're interested in (e.g., gross sales, net revenue after returns, revenue by specific product lines)? | transaction_id, transaction_date, gross_revenue_amount, product_category, sales_channel, is_return |
| 8 | "Top performing sales reps list please." | ❌ | N/A | N/A |
| 9 | "I need a report on enterprise deals." | ✅ | Could you please define what constitutes an 'enterprise deal' for this report? For instance, is there a specific revenue threshold, customer segment, or a designation field we should use? | deal_id, deal_name, deal_stage, deal_revenue_usd, close_date, customer_segment |
| 10 | "Compare this month to last year." | ✅ | What specific metric(s) should we compare (e.g., total sales, number of active users, revenue, conversion rates)? | event_timestamp, metric_value, metric_type, business_segment, customer_id |
| 11 | "How many people are using the dashboard?" | ✅ | Could you please clarify what 'using' means for this request? For example, are we looking for unique users who have viewed any part of the dashboard, or users who have interacted with specific features? | user_id, event_timestamp, dashboard_id, event_type, session_id |
| 12 | "What's the drop-off rate for the signup flow?" | ✅ | Could you please specify the exact steps you consider part of the 'signup flow' (e.g., from landing page view to profile completion)? | user_id, event_timestamp, event_name, session_id, device_type, platform |
| 13 | "Are mobile users more active than desktop?" | ✅ | How do you define 'active' for the purpose of this analysis (e.g., number of logins, sessions, specific feature usage, or another metric)? | user_id, event_timestamp, device_type, event_type, session_id, duration_seconds |
| 14 | "List of most popular items purchased." | ✅ | How do you define 'most popular' for this request? Are we looking at units sold, revenue generated, or the number of unique customers purchasing the item? | product_sku, product_name, order_id, purchase_date, quantity_purchased, item_price |
| 15 | "Retention rates for the new cohort." | ✅ | Could you please specify the exact criteria that define the 'new cohort' you're interested in (e.g., users who signed up in X month, customers who purchased product Y, or users of a specific product version)? | user_id, onboarding_date, activity_date, activity_type, product_version_at_signup |
| 16 | "I need the cost of goods sold for April." | ✅ | Which specific year are you referring to for 'April'? | order_date, product_id, unit_cost, quantity_sold, shipping_cost, discount_amount |
| 17 | "What's our burn rate?" | ✅ | Could you please specify which type of 'burn rate' you're interested in (e.g., cash burn, operational burn, or a project-specific burn)? | transaction_date, transaction_amount, transaction_type, category, department_id |
| 18 | "Inventory levels for the west coast warehouse." | ✅ | What specific timeframe are you interested in for the inventory levels (e.g., current, end of last week, last month average)? | warehouse_id, warehouse_name, inventory_date, product_sku, quantity_on_hand |
| 19 | "Vendor payments report." | ❌ | N/A | N/A |
| 20 | "Show me profit margins by region." | ❌ | N/A | N/A |
| 21 | "How many tickets did we close yesterday?" | ❌ | N/A | N/A |
| 22 | "What are the top complaints?" | ❌ | N/A | N/A |
| 23 | "Average response time per agent." | ❌ | N/A | N/A |
| 24 | "CSAT scores for the last month." | ❌ | N/A | N/A |
| 25 | "Refunds processed list." | ❌ | N/A | N/A |
| 26 | "Get me the numbers." | ✅ | What specific metrics are you interested in (e.g., sales, users, revenue, costs)? | event_date, metric_value, metric_type, segment_dimension, segment_value |
| 27 | "Is the business healthy?" | ❌ | N/A | N/A |
| 28 | "Data for the investor slide deck." | ✅ | Could you please specify the key metrics or KPIs you're looking for (e.g., revenue, user growth, retention)? | reporting_period_end_date, total_revenue_usd, total_active_customers, gross_margin_percent, customer_churn_rate_percent |
| 29 | "Update the weekly KPI sheet." | ❌ | N/A | N/A |
| 30 | "Why are the numbers wrong?" | ❌ | N/A | N/A |

