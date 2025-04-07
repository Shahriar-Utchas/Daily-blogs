# Blog Application with Bookmark and Read Time Features using React

## What has been done:

- **Create Fake Data for Blogs and Load Data**:
  - Fake blog data is used to simulate a blog list and is loaded into the application when the component mounts.
  
- **Handle Bookmark State and Display Bookmarks**:
  - Blogs can be bookmarked using the "Bookmark" button.
  - The state for bookmarked blogs is managed and displayed.
  - Clicking on "Show All Bookmarks" will display only the bookmarked blogs, toggling between the full list and the bookmarked list.

- **Lift Up State**:
  - States such as `bookmarked` and `read status` are managed in the individual blog component and lifted to the main `Blogs` component when needed.
  
- **Using Local Storage**:
  - All data regarding bookmarks, marked-read status, and total reading time is stored in `localStorage`.
  - The bookmarks list is persisted in `localStorage`, so even after page reloads, the bookmarked blogs remain intact.
  - The total read time is calculated and stored in `localStorage` so it persists between sessions.

- **Dark/Light Theme Toggle**:
  - A dark/light theme toggle is implemented allowing users to switch between a dark and light mode.
  - The theme preference is stored in `localStorage`, ensuring the theme persists even after page reloads.


