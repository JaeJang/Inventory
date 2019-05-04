import {SIDEBAR_WIDTH, COLLAPSED_SIDEBAT_WIDTH} from '../values/elementSize';

export const collapsing = (comp) => {
    comp.sidebar_width = SIDEBAR_WIDTH;
        comp.mainRef_c = comp.props.mainRef.current;
        comp.sidebarRef_c = comp.sidbarRef.current;

        if( comp.mainRef_c.offsetLeft !== 0){
                
            comp.timerSidebar = setInterval(()=>{
                
                comp.sidebar_width -= 4;
                comp.sidebarRef_c.style.width = comp.sidebar_width + 'px';
                comp.mainRef_c.style.marginLeft = comp.sidebar_width + 'px';
                if(comp.sidebarRef_c.offsetWidth == COLLAPSED_SIDEBAT_WIDTH){
                    clearInterval(comp.timerSidebar);
                    
                }
            }, 5);
            comp.setState({
                isCollapsed:true,
            }, () => {
                //comp.sidebarRef_c.style.width = COLLAPSED_SIDEBAT_WIDTH + 'px';
            });
        } else {
            comp.setState({
                isCollapsed:true,
            }, () => {
                comp.sidebarRef_c.style.width = COLLAPSED_SIDEBAT_WIDTH + 'px';
            });
        }
        
}

export const reverse = (comp) => {
    comp.sidebar_width = comp.sidbarRef.current.offsetWidth;
        comp.mainRef_c = comp.props.mainRef.current;
        comp.sidebarRef_c = comp.sidbarRef.current;

        if( comp.mainRef_c.offsetLeft !== 0){
                
            comp.timerSidebar = setInterval(()=>{
                comp.sidebar_width += 4;
                comp.sidebarRef_c.style.width = comp.sidebar_width + 'px';
                //if(comp.mainRef.current.offsetLeft !== 0){
                    comp.mainRef_c.style.marginLeft = comp.sidebar_width + 'px';
    
                //}
                if(comp.sidebarRef_c.offsetWidth == SIDEBAR_WIDTH){
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
                comp.sidebarRef_c.style.width = SIDEBAR_WIDTH + 'px';
            });
        }
}