import React from "react";
import { LogoutBtn, Container } from "../";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Logo} from "../index";
import { SlHome } from "react-icons/sl";
const Header = () => {
  const authstatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const username=useSelector((state) => state.auth.userdata?.name);

 
  const navItem = [
    { name: <SlHome />, slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authstatus },
    { name: "Signup", slug: "/signup", active: !authstatus },
    { name: "My Posts", slug: "/my-posts", active: authstatus },
    { name: "Add Post", slug: "/add-post", active: authstatus },
  ];

  return (
    <header className="w-full  border-b-black border py-2 px-6 shadow-md font-mono capitalize">
      
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold  hidden md:block">
            
            {/* {authstatus && username} */}
            <Logo/>
          </div>
          <ul className="flex items-center space-x-6">
            {navItem.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="transition hover:underline"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            </ul>
            {authstatus && (
              
                <LogoutBtn className="ml-4 " />
              
            )}
          
        </nav>
      
    </header>
  );
};

export default Header;
