import React from "react";
import { LogoutBtn, Container } from "../";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authstatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const username=useSelector((state) => state.auth.userdata?.name);

 
  const navItem = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authstatus },
    { name: "Signup", slug: "/signup", active: !authstatus },
    { name: "All Posts", slug: "/all-posts", active: authstatus },
    { name: "Add Post", slug: "/add-post", active: authstatus },
  ];

  return (
    <header className="w-full bg-emerald-400 text-white py-2 px-6 shadow-md">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold">
            {/* <Link to="/">Logo</Link> */}
            {authstatus && username}
          </div>
          <ul className="flex items-center space-x-6">
            {navItem.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="hover:text-emerald-100 transition"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            
            {authstatus && (
              <li>
                <LogoutBtn className="ml-4 text-emerald-700 hover:text-white" />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
