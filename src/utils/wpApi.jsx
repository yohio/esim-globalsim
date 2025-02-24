import config from '@/lib/config';
import axios from 'axios';

const apiUrl = ( process.env.NEXT_PUBLIC_WP_REST_API_URL || "https://example.com/wp-json" ).replace(/\/$/, '');
const graphqlUrl = ( process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "https://example.com/graphql" ).replace(/\/$/, '');

export const wpApi = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Function to execute a GraphQL query.
 */
export async function fetchGraphQL(
  query,
  variables = {},
  preview = false
) {
  try {
    // Validate the WordPress GraphQL URL.    
    if (!graphqlUrl) {
      throw new Error('Missing WordPress GraphQL URL environment variable!');
    }

    // Get the refresh token.
    const refreshToken = process.env.NEXT_PUBLIC_JWT_SECRET;

    // Prepare headers.
    const headers = {
      'Content-Type': 'application/json'
    };

    // If preview mode is enabled and we have a token.
    if (preview && refreshToken) {
      // Add refresh token to fetch headers.
      headers['Authorization'] = `Bearer ${refreshToken}`;
    }

    // Get the slug.
    const slug = variables?.slug || variables?.id || 'graphql';

    // Fetch data from external API.
    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables
      }),
      next: {
        tags: [slug],
        revalidate: config.revalidate
      }
    });

    // If the response status is not 200, throw an error.
    if (!response.ok) {
      console.error('Response Status:', response.status);
      throw new Error(response.statusText);
    }

    // Read the response as JSON.
    const data = await response.json();

    // Throw an error if there was a GraphQL error.
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      throw new Error('Error executing GraphQL query');
    }

    // Finally, return the data.
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Search the WordPress REST API for posts matching the query.
 *
 * @see https://developer.wordpress.org/rest-api/reference/search-results/
 */
export async function searchQuery(query) {
  // Sanitize the search query.
  query = encodeURIComponent(query.trim());

  try {
    // If there is no URL, throw an error.
    if (!process.env.NEXT_PUBLIC_WP_REST_API_URL) {
      throw new Error('Missing WordPress REST API URL environment variable!');
    }

    // Always fetch fresh search results.
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_REST_API_URL}/search?search=${query}&subtype=any&per_page=100`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        next: {
          tags: [`search-${query}`],
          revalidate: config.revalidate
        }
      }
    );

    // If the response status is not 200, throw an error.
    if (!response.ok) {
      console.error('Response Status:', response.status);
      throw new Error(response.statusText);
    }

    // Read the response as JSON.
    const data = await response.json();

    // Verify data has posts.
    if (!data || data.length === 0) {
      throw new Error('No posts found.');
    }

    // Return the data.
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}