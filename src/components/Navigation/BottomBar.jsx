import { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { Heart } from "../../Icons";
import { navLinks } from "../../constants/navbar";

const BottomBar = () => {
    return (
        <div className="py-5 fixed bottom-0 justify-between px-4 w-full flex bg-primary text-light font-body z-10">
            {
                navLinks.map((item, index) => (
                    <Fragment key={index} >
                        {item.title === "Matchs" ?
                            <Link className="bg-white rounded-full p-4 shadow-sm" to={item.path}>
                                <Heart path="fill-primary" />
                                <p className="sr-only">{item.title}</p>
                            </Link>
                            :
                            <NavLink to={item.path} className="flex flex-col items-center justify-center">
                                <item.icon />
                                {/* <p className="uppercase text-xs">{item.title}</p> */}
                            </NavLink>
                        }
                    </Fragment>

                ))
            }
        </div>
    )
}

export default BottomBar