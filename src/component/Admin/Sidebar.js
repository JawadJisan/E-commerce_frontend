import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";

import { GrAdd } from 'react-icons/gr'
import { MdImportExport, MdRateReview, MdExpandMore } from 'react-icons/md'
import { FaRegListAlt } from 'react-icons/fa'
import { RiDashboardLine } from 'react-icons/ri'
import { BsPeopleFill } from 'react-icons/bs'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                <img src={logo} alt="Ecommerce" />
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <RiDashboardLine /> Dashboard
                </p>
            </Link>
            <Link>
                <TreeView
                    defaultCollapseIcon={<MdExpandMore />}
                    defaultExpandIcon={<MdImportExport />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<GrAdd />} />
                        </Link>

                        <Link to="/admin/product">
                            <TreeItem nodeId="3" label="Create" icon={<GrAdd />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/admin/orders">
                <p>
                    <FaRegListAlt />
                    Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <BsPeopleFill /> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <MdRateReview />
                    Reviews
                </p>
            </Link>
        </div>
    );
};

export default Sidebar;