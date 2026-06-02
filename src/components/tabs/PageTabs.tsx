import {
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from "react";

type PageTabProps = PropsWithChildren<{
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  isActive: boolean;
}>;

type PageTabsProps = {
  tabConfig: PageTabConfig[];
};

type PageTabConfig = {
  label: string;
  contentId: string;
};

const PageTab = ({ buttonProps, isActive, children }: PageTabProps) => {
  return (
    <button
      {...buttonProps}
      className="tab-links flex justify-center items-center w-full lg:w-50 h-12 lg:h-20 p-2 cursor-pointer not-first:border-l not-last-of-type:border-b lg:sm:nth-of-type-[-n+3]:border-b-0 border-flick-dark text-center uppercase font-light lg:text-lg transition duration-150 hover:bg-linear-to-b hover:from-flick-black hover:to-[#242424] data-active:text-flick-yellow data-active:bg-linear-to-b data-active:from-flick-black data-active:to-[#242424]"
      {...(isActive && { "data-active": true })}
    >
      {children}
    </button>
  );
};

const PageTabs = ({ tabConfig }: PageTabsProps) => {
  const [active, setActive] = useState(tabConfig[0].contentId);
  const [tabMobileOptions, setTabMobileOptions] = useState([...tabConfig]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleTabClick = (newActive: string) => {
    console.log("newActive", newActive);
    setActive((prev) => {
      const activeContent = document.getElementById(prev);
      activeContent?.classList.add("hidden");
      activeContent?.classList.remove("block");

      const newActiveContent = document.getElementById(newActive);
      newActiveContent?.classList.add("block");
      newActiveContent?.classList.remove("hidden");

      return newActive;
    });
    setTabMobileOptions(() => {
      const finalOptions =
        tabConfig.filter(({ contentId }) => newActive !== contentId) ??
        tabConfig[0];
      finalOptions.unshift(
        tabConfig.find(({ contentId }) => newActive === contentId) ??
          tabConfig[0],
      );
      return finalOptions;
    });
    location.hash = newActive;
  };

  const handleMobileTabClick = (newActive: string) => {
    handleTabClick(newActive);
    setMobileOpen(false);
  };

  useEffect(() => {
    const openTab = location.hash
      ? location.hash.slice(1)
      : tabConfig[0].contentId;
    if (openTab !== active) {
      handleTabClick(openTab);
    }
  }, []);

  return (
    <div className="border-b border-flick-dark overflow-x-auto">
      <div
        id="page-tabs"
        className="hidden lg:flex flex-row flex-wrap lg:flex-nowrap max-w-full lg:max-w-fit w-full m-auto border-x border-flick-dark"
      >
        {tabConfig.map(({ label, contentId }, i) => (
          <PageTab
            isActive={contentId === active}
            buttonProps={{
              onClick: () => handleTabClick(contentId),
            }}
          >
            {label}
          </PageTab>
        ))}
      </div>

      <div className="lg:hidden">
        <PageTab
          isActive
          buttonProps={{
            onClick: () => setMobileOpen(!mobileOpen),
          }}
        >
          <span className="sr-only">Open tabs menu</span>
          {tabMobileOptions[0].label}
        </PageTab>
        <div
          className="hidden border-t border-flick-dark data-open:block"
          {...(mobileOpen && { "data-open": true })}
        >
          {tabMobileOptions.slice(1).map(({ label, contentId }, i) => (
            <PageTab
              isActive={contentId === active}
              buttonProps={{
                onClick: () => handleMobileTabClick(contentId),
              }}
            >
              {label}
            </PageTab>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageTabs;
