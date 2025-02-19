import React from 'react'

 const Layout = ({navbar,children}) => {
  return (
    <div>
      <header>{navbar} </header>
  <h1>Body</h1>
          <p>Welcome</p>
          <main> {children} </main>

      <footer className="bg-gray-800 text-white text-center py-4 mt-4">
        &copy; 2025 Vehicle Service Management. All rights reserved.
      </footer>
    </div>
  );
}
export default React.memo(Layout)
