import LoginNavigation from "../LoginNavigation";

const NavigationBar = () => {
  return (
    <nav className="sticky top-0 z-[999] flex h-16 w-full justify-around bg-purple-900 bg-opacity-70 backdrop-blur">
      <LoginNavigation />
    </nav>
  );
};

export default NavigationBar;
