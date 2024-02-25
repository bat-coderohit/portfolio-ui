import Sidebar from "../Sidebar/Sidebar";

const menuItems: string[] = ["Homepage", "About", "Portfolio", "Contact", "Goals"];

const Navbar = () => {

    return (
        <div className='snap-center flex justify-center items-center h-24'>

            {/* SideBar */}
            <Sidebar items={menuItems} />

        </div>
    );
}

export default Navbar;