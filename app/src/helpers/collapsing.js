import {SIDEBAR_WIDTH, COLLAPSED_SIDEBAT_WIDTH} from '../values/elementSize';

// Collapse the sidebar
export const collapsing = (comp) => {
    let sidebar_width = SIDEBAR_WIDTH;
    let mainRef_c = comp.props.mainRef.current;
    let sidebarRef_c = comp.sidbarRef.current;

    // If the screen size is big
    if( mainRef_c.offsetLeft !== 0){
            
        comp.timerSidebar = setInterval(()=>{
            
            sidebar_width -= 4;
            sidebarRef_c.style.width = sidebar_width + 'px';
            mainRef_c.style.marginLeft = sidebar_width + 'px';
            if(sidebarRef_c.offsetWidth == COLLAPSED_SIDEBAT_WIDTH){
                clearInterval(comp.timerSidebar);
                
            }
        }, 5);
        comp.setState({
            isCollapsed:true,
        });
    } else {
        comp.setState({
            isCollapsed:true,
        }, () => {
            sidebarRef_c.style.width = COLLAPSED_SIDEBAT_WIDTH + 'px';
        });
    }
        
}

// Show the sidebar
export const reverse = (comp) => {
    let sidebar_width = comp.sidbarRef.current.offsetWidth;
    let mainRef_c = comp.props.mainRef.current;
    let sidebarRef_c = comp.sidbarRef.current;

    if( mainRef_c.offsetLeft !== 0){
            
        comp.timerSidebar = setInterval(()=>{
            sidebar_width += 4;
            sidebarRef_c.style.width = sidebar_width + 'px';
            //if(comp.mainRef.current.offsetLeft !== 0){
                mainRef_c.style.marginLeft = sidebar_width + 'px';

            //}
            if(sidebarRef_c.offsetWidth == SIDEBAR_WIDTH){
                clearInterval(comp.timerSidebar);
                comp.setState({
                    isCollapsed:false,
                });
            }
        }, 5);
    } else {
        comp.setState({
            isCollapsed:false,
        }, () => {
            sidebarRef_c.style.width = SIDEBAR_WIDTH + 'px';
        });
    }
}