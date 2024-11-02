const getApiGuide = (req, res) => {
  res.json({
    "API Guide": [
      {
        section: "Authentication Routes",
        base_path: "/api/auth",
        routes: [
          {
            method: "POST",
            path: "/api/auth/register",
            description: "Register a new user",
          },
          {
            method: "POST",
            path: "/api/auth/login",
            description: "User login",
          },
          {
            method: "GET",
            path: "/api/auth/me",
            description: "Get logged-in user data (requires authentication)",
          },
          {
            method: "PUT",
            path: "/api/auth/me",
            description: "Update logged-in user data (requires authentication)",
          },
        ],
      },
      {
        section: "Admin Authentication Routes",
        base_path: "/api/auth/admin",
        routes: [
          {
            method: "POST",
            path: "/api/auth/admin/register",
            description: "Register a new admin",
          },
          {
            method: "POST",
            path: "/api/auth/admin/login",
            description: "Admin login",
          },
          {
            method: "PUT",
            path: "/api/auth/admin/me",
            description:
              "Update logged-in admin data (requires authentication)",
          },
        ],
      },
      {
        section: "Post Routes",
        base_path: "/api/posts",
        routes: [
          {
            method: "GET",
            path: "/api/posts",
            description: "Retrieve all posts",
          },
          {
            method: "POST",
            path: "/api/posts/newpost",
            description: "Create a new post with image upload",
          },
          {
            method: "GET",
            path: "/api/posts/:id",
            description: "Retrieve a specific post by ID",
          },
          {
            method: "PUT",
            path: "/api/posts/:id",
            description: "Update a post by ID",
          },
          {
            method: "DELETE",
            path: "/api/posts/:id",
            description: "Delete a post by ID",
          },
        ],
      },
      {
        section: "Comment Routes",
        base_path: "/api/comments",
        routes: [
          {
            method: "POST",
            path: "/api/comments",
            description:
              "Create a new comment on a post (requires authentication)",
          },
          {
            method: "GET",
            path: "/api/comments/:postId",
            description: "Retrieve comments for a specific post",
          },
          {
            method: "GET",
            path: "/api/comments",
            description: "Retrieve all comments",
          },
        ],
      },
      {
        section: "Tag Routes",
        base_path: "/api/tags",
        routes: [
          {
            method: "POST",
            path: "/api/tags",
            description: "Create a new tag",
          },
          {
            method: "GET",
            path: "/api/tags",
            description: "Retrieve all tags",
          },
          {
            method: "PUT",
            path: "/api/tags/:id",
            description: "Update a specific tag by ID",
          },
          {
            method: "DELETE",
            path: "/api/tags/:id",
            description: "Delete a specific tag by ID",
          },
        ],
      },
    ],
  });
};

module.exports = { getApiGuide };
