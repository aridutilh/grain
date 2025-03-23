/**
 * Scrolls the window to the top with optional smooth behavior
 * @param smooth Whether to use smooth scrolling (default: false for instant jump)
 */
export const scrollToTop = (smooth: boolean = false) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

/**
 * Utility hook to automatically scroll to top on component mount
 */
export const useScrollToTop = () => {
  // Import the useEffect hook from React at the usage site
  // useEffect(() => {
  //   scrollToTop();
  // }, []);
}; 