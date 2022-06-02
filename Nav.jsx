import React, { useEffect, useState } from 'react'
import { Link ,Outlet} from "react-router-dom"
import { useCookies } from "react-cookie"
import $ from "jquery" 
import axios from "axios"
import "./Nav.scss"
import { useDispatch , useSelector } from 'react-redux'

const Nav = () => {


    const url = useSelector(state => state.url)
    const isLogged=useSelector(state => state.logged)
    const dispatcher = useDispatch()

    /*handle change burger with classes*/
    const [lastScroll, setLastScroll] = useState(null)
    const [userData,setUserData]=useState({})
    const [lastTimeOut,setLastTimeOut]=useState()
    const [showMenu,setShowMenu]=useState(false)
    const burgerClick = () => {
        var idBurger = document.getElementById("burger");
        var liste = document.querySelector("#leftNav");
        if (idBurger.getAttribute("class") !== "active z-40") {
            idBurger.setAttribute("class", "active z-40");
            liste.style.width = "100%";
        }
        else {
            idBurger.setAttribute("class", "Notactive z-40");
            liste.style.width = "0";
        }
    }
    


    const [cookie, setCookie] = useCookies()

    const logOut=()=>{
        setCookie("clid","",{maxAge:0})
        window.location.reload()
        dispatcher({type:"logout"})
        
    }
    const fetchUserData=()=>{
        const id=encodeURIComponent(cookie.clid)
        axios.get(`${url}getUser.php?clid=${id}`).then((res)=>{
            setUserData(res.data)
        })
    }
    useEffect(() => {
        if (isLogged){
            fetchUserData()
        }
    }, [])
    /*handle nav state after scrolling*/
    const showNavBar=()=>{
       const navBar = document.querySelector(".navBar")
       navBar.style.height = "" 
    }
    const hideNavBar=()=>{
       const navBar = document.querySelector(".navBar")
       navBar.style.height = "0" 
    }
    const changeStateNav = () => {
        clearTimeout(lastTimeOut)
        if (window.innerWidth >= 1024) {
            if (lastScroll >= window.scrollY && window.scrollY > 80) {
                showNavBar()
                const time=setTimeout(() => {
                    if (window.scrollY > 80&& !showMenu) 
                    {
                        hideNavBar()
                    }
                }, 4000)
                setLastTimeOut(time)
            }
            else {
                if (window.scrollY > 80&& !showMenu) {
                    hideNavBar()
                }
                else {
                    showNavBar()
                }
            }
            setLastScroll(window.scrollY)
        }
    }
    /*make navbar visible when we resize screen when navbar not visible in the lg screen*/
    useEffect(() => {
        const handleResizeScreen = () => {
            document.querySelector(".navBar").style.height = ""
        }
        window.addEventListener("resize", handleResizeScreen)
        return () => {
            window.removeEventListener("resize", handleResizeScreen)
        }
    }, [])
    /* for changing page or refresh */
    useEffect(() => {
        changeStateNav();
    }, [])
    useEffect(() => {
        $(window).scroll(changeStateNav)
        return () => {
            $(window).off("scroll",changeStateNav)
        }
    })
    const handleClientThinking=()=>{
        clearTimeout(lastTimeOut)
    }
    return (
        <React.Fragment>
        <div onMouseEnter={handleClientThinking} onMouseLeave={changeStateNav} className="navBar z-10 overflow-hidden transition-all delay-200 duration-300  w-full fixed top-0 left-0 flex flex-row-reverse items-center justify-between shadow-md shadow-neutral-100 h-20 lg:h-16 bg-white">
            <div className="flex flex-row-reverse items-center lg:justify-center justify-between lg:w-3/12 w-full xl:w-3/12">
                <div className="lg:hidden z-40" onClick={burgerClick} id="burger"><div className="burger h-20 w-20 flex flex-col justify-center lg:hidden items-center"></div></div>
                <Link to="/" className={`text-3xl w-full ${isLogged&&"mr-20 lg:mr-0"} lg:w-auto text-center lg:text-left text-yellow-400 self-center font-title tracking-wider cursor-pointer`}>جواهرجية</Link>
            </div>
            {/*for lg*/}
            <div className={`transition-all delay-75 duration-300 whitespace-nowrap ${!isLogged?"lg:w-6/12":"lg:w-5/12"}  z-30 bg-white xl:w-5/12 hidden lg:flex flex-col lg:flex-row fixed left-0 top-0 w-0 overflow-hidden lg:static h-full items-center justify-center lg:justify-around font-body font-semibold text-neutral-600`}>
                <Link to="/Contact" className='flex hover:text-yellow-500 delay-100 duration-200 hover:fill-yellow-500 fill-neutral-600 flex-row-reverse items-center cursor-pointer'>
                    <svg className='h-6 w-6 ml-px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="none" d="M0 0h48v48h-48z"/><path d="M22 34h4v-12h-4v12zm2-30c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 36c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"/></svg>
                    <p>الموجز</p>
                </Link>
                <Link to="/Contact" className='flex hover:text-yellow-500 delay-100 duration-200 hover:fill-yellow-600 fill-neutral-600 flex-row-reverse items-center cursor-pointer'>
                    <svg className='h-6 w-6 ml-px' xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 64 64" viewBox="0 0 64 64"><path d="M44,11H20c-1.7,0-3,1.3-3,3v4c0,1.7,1.3,3,3,3h24c1.7,0,3-1.3,3-3v-4C47,12.3,45.7,11,44,11z M45,18    c0,0.6-0.4,1-1,1H20c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h24c0.6,0,1,0.4,1,1V18z"/><path d="M48,5H16c-1.7,0-3,1.3-3,3v48c0,1.7,1.3,3,3,3h32c1.7,0,3-1.3,3-3V8C51,6.3,49.7,5,48,5z M49,56    c0,0.6-0.4,1-1,1H16c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h32c0.6,0,1,0.4,1,1V56z"/><path d="M23 25h-2c-1.7 0-3 1.3-3 3v2c0 1.7 1.3 3 3 3h2c1.7 0 3-1.3 3-3v-2C26 26.3 24.7 25 23 25zM24 30c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h2c.6 0 1 .4 1 1V30zM33 25h-2c-1.7 0-3 1.3-3 3v2c0 1.7 1.3 3 3 3h2c1.7 0 3-1.3 3-3v-2C36 26.3 34.7 25 33 25zM34 30c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h2c.6 0 1 .4 1 1V30zM43 25h-2c-1.7 0-3 1.3-3 3v2c0 1.7 1.3 3 3 3h2c1.7 0 3-1.3 3-3v-2C46 26.3 44.7 25 43 25zM44 30c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h2c.6 0 1 .4 1 1V30zM23 35h-2c-1.7 0-3 1.3-3 3v2c0 1.7 1.3 3 3 3h2c1.7 0 3-1.3 3-3v-2C26 36.3 24.7 35 23 35zM24 40c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h2c.6 0 1 .4 1 1V40zM33 35h-2c-1.7 0-3 1.3-3 3v2c0 1.7 1.3 3 3 3h2c1.7 0 3-1.3 3-3v-2C36 36.3 34.7 35 33 35zM34 40c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h2c.6 0 1 .4 1 1V40zM43 35h-2c-1.7 0-3 1.3-3 3v12c0 1.7 1.3 3 3 3h2c1.7 0 3-1.3 3-3V38C46 36.3 44.7 35 43 35zM44 50c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V38c0-.6.4-1 1-1h2c.6 0 1 .4 1 1V50zM23 45h-2c-1.7 0-3 1.3-3 3v2c0 1.7 1.3 3 3 3h2c1.7 0 3-1.3 3-3v-2C26 46.3 24.7 45 23 45zM24 50c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h2c.6 0 1 .4 1 1V50zM33 45h-2c-1.7 0-3 1.3-3 3v2c0 1.7 1.3 3 3 3h2c1.7 0 3-1.3 3-3v-2C36 46.3 34.7 45 33 45zM34 50c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h2c.6 0 1 .4 1 1V50z"/></svg>
                    <p>حسابة اسعار الذهب</p>
                </Link>
                <Link to="/Contact" className='flex hover:text-yellow-500 delay-100 duration-200 hover:fill-yellow-600 fill-neutral-600 flex-row-reverse items-center cursor-pointer'>
                    <svg className='h-6 w-6 ml-px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path style={{lineHeight:"normal",textIndent:0,textAlign:'start',textDecorationLine:"none",textDecorationStyle:"solid",textDecorationColor:"#000",textTransform:"none",blockProgression:"tb",whiteSpace:"normal",isolation:"auto",mixBlendMode:"normal",solidColor:"#000",solidOpacity:1}}  d="M 8.9238281 3 C 7.8532993 3 7.0019531 3.9147999 7.0019531 5 L 7.0019531 6 L 5.0957031 6 A 0.50005003 0.50005003 0 0 0 4.6269531 6.328125 L 2.0644531 13.244141 A 0.50005006 0.50005006 0 0 0 2.0078125 13.408203 A 0.50005003 0.50005003 0 0 0 2.0292969 13.703125 C 2.0992713 14.5116 2.541767 15.24817 3.2519531 15.658203 C 3.7886564 15.968082 4.4117389 16.048267 5.0019531 15.927734 L 5.0019531 29.5 A 0.50005003 0.50005003 0 0 0 5.5019531 30 L 8.4257812 30 A 0.50005006 0.50005006 0 0 0 9.0019531 29.5 L 9.0019531 22.994141 L 12.001953 22.994141 L 12.001953 29.5 A 0.50005006 0.50005006 0 0 0 12.574219 30 A 0.50005003 0.50005003 0 0 0 12.585938 30 L 27.501953 30 A 0.50005003 0.50005003 0 0 0 28.001953 29.5 L 28.001953 15.927734 C 28.592168 16.048267 29.21525 15.968082 29.751953 15.658203 C 30.46271 15.24784 30.905207 14.510419 30.974609 13.701172 A 0.50005003 0.50005003 0 0 0 30.994141 13.392578 A 0.50005006 0.50005006 0 0 0 30.939453 13.242188 L 28.378906 6.328125 A 0.50005003 0.50005003 0 0 0 27.910156 6 L 26.001953 6 L 26.001953 5 C 26.001953 3.9147999 25.15256 3 24.082031 3 L 8.9238281 3 z M 8.9238281 4 L 24.082031 4 C 24.586047 4 25.001953 4.4232999 25.001953 5 L 25.001953 6 L 8.0019531 6 L 8.0019531 5 C 8.0019531 4.4232999 8.4198124 4 8.9238281 4 z M 5.4433594 7 L 27.5625 7 L 29.992188 13.5625 C 29.967878 14.070994 29.695833 14.534795 29.251953 14.791016 C 28.787157 15.059416 28.216749 15.059416 27.751953 14.791016 C 27.287146 14.522716 27.00194 14.028888 27.001953 13.492188 A 0.50005006 0.50005006 0 0 0 27 13.441406 A 0.50005006 0.50005006 0 0 0 26.853516 13.130859 A 0.50005006 0.50005006 0 0 0 26.818359 13.097656 A 0.50005006 0.50005006 0 0 0 26.816406 13.097656 A 0.50005006 0.50005006 0 0 0 26.542969 12.986328 A 0.50005006 0.50005006 0 0 0 26.445312 12.988281 A 0.50005006 0.50005006 0 0 0 26.443359 12.988281 A 0.50005006 0.50005006 0 0 0 26.138672 13.140625 A 0.50005006 0.50005006 0 0 0 26.138672 13.142578 A 0.50005006 0.50005006 0 0 0 26.105469 13.179688 A 0.50005006 0.50005006 0 0 0 26.105469 13.181641 A 0.50005006 0.50005006 0 0 0 26.078125 13.220703 A 0.50005006 0.50005006 0 0 0 26.076172 13.222656 A 0.50005006 0.50005006 0 0 0 26.066406 13.240234 A 0.50005006 0.50005006 0 0 0 26.052734 13.263672 A 0.50005006 0.50005006 0 0 0 26.052734 13.265625 A 0.50005006 0.50005006 0 0 0 26.033203 13.310547 A 0.50005006 0.50005006 0 0 0 26.033203 13.3125 A 0.50005006 0.50005006 0 0 0 26.017578 13.357422 A 0.50005006 0.50005006 0 0 0 26.017578 13.359375 A 0.50005006 0.50005006 0 0 0 26.007812 13.40625 A 0.50005006 0.50005006 0 0 0 26.007812 13.408203 A 0.50005006 0.50005006 0 0 0 26.001953 13.457031 A 0.50005006 0.50005006 0 0 0 26.001953 13.492188 C 26.001966 14.028888 25.71676 14.522716 25.251953 14.791016 C 24.787157 15.059416 24.216749 15.059416 23.751953 14.791016 C 23.287146 14.522716 23.00194 14.028888 23.001953 13.492188 A 0.50005006 0.50005006 0 0 0 23 13.441406 A 0.50005006 0.50005006 0 0 0 22.853516 13.130859 A 0.50005006 0.50005006 0 0 0 22.818359 13.097656 A 0.50005006 0.50005006 0 0 0 22.816406 13.097656 A 0.50005006 0.50005006 0 0 0 22.542969 12.986328 A 0.50005006 0.50005006 0 0 0 22.445312 12.988281 A 0.50005006 0.50005006 0 0 0 22.443359 12.988281 A 0.50005006 0.50005006 0 0 0 22.138672 13.140625 A 0.50005006 0.50005006 0 0 0 22.138672 13.142578 A 0.50005006 0.50005006 0 0 0 22.105469 13.179688 A 0.50005006 0.50005006 0 0 0 22.105469 13.181641 A 0.50005006 0.50005006 0 0 0 22.078125 13.220703 A 0.50005006 0.50005006 0 0 0 22.076172 13.222656 A 0.50005006 0.50005006 0 0 0 22.066406 13.240234 A 0.50005006 0.50005006 0 0 0 22.052734 13.263672 A 0.50005006 0.50005006 0 0 0 22.052734 13.265625 A 0.50005006 0.50005006 0 0 0 22.033203 13.310547 A 0.50005006 0.50005006 0 0 0 22.033203 13.3125 A 0.50005006 0.50005006 0 0 0 22.017578 13.357422 A 0.50005006 0.50005006 0 0 0 22.017578 13.359375 A 0.50005006 0.50005006 0 0 0 22.007812 13.40625 A 0.50005006 0.50005006 0 0 0 22.007812 13.408203 A 0.50005006 0.50005006 0 0 0 22.001953 13.457031 A 0.50005006 0.50005006 0 0 0 22.001953 13.492188 C 22.001966 14.028888 21.71676 14.522716 21.251953 14.791016 C 20.787157 15.059416 20.216749 15.059416 19.751953 14.791016 C 19.287146 14.522716 19.00194 14.028888 19.001953 13.492188 A 0.50005006 0.50005006 0 0 0 19 13.441406 A 0.50005006 0.50005006 0 0 0 18.853516 13.130859 A 0.50005006 0.50005006 0 0 0 18.818359 13.097656 A 0.50005006 0.50005006 0 0 0 18.816406 13.097656 A 0.50005006 0.50005006 0 0 0 18.542969 12.986328 A 0.50005006 0.50005006 0 0 0 18.445312 12.988281 A 0.50005006 0.50005006 0 0 0 18.443359 12.988281 A 0.50005006 0.50005006 0 0 0 18.138672 13.140625 A 0.50005006 0.50005006 0 0 0 18.138672 13.142578 A 0.50005006 0.50005006 0 0 0 18.105469 13.179688 A 0.50005006 0.50005006 0 0 0 18.105469 13.181641 A 0.50005006 0.50005006 0 0 0 18.078125 13.220703 A 0.50005006 0.50005006 0 0 0 18.076172 13.222656 A 0.50005006 0.50005006 0 0 0 18.066406 13.240234 A 0.50005006 0.50005006 0 0 0 18.052734 13.263672 A 0.50005006 0.50005006 0 0 0 18.052734 13.265625 A 0.50005006 0.50005006 0 0 0 18.033203 13.310547 A 0.50005006 0.50005006 0 0 0 18.033203 13.3125 A 0.50005006 0.50005006 0 0 0 18.017578 13.357422 A 0.50005006 0.50005006 0 0 0 18.017578 13.359375 A 0.50005006 0.50005006 0 0 0 18.007812 13.40625 A 0.50005006 0.50005006 0 0 0 18.007812 13.408203 A 0.50005006 0.50005006 0 0 0 18.001953 13.457031 A 0.50005006 0.50005006 0 0 0 18.001953 13.492188 C 18.001966 14.028888 17.71676 14.522716 17.251953 14.791016 C 16.787157 15.059416 16.216749 15.059416 15.751953 14.791016 C 15.287146 14.522716 15.00194 14.028888 15.001953 13.492188 A 0.50005006 0.50005006 0 0 0 15 13.441406 A 0.50005006 0.50005006 0 0 0 14.853516 13.130859 A 0.50005006 0.50005006 0 0 0 14.818359 13.097656 A 0.50005006 0.50005006 0 0 0 14.816406 13.097656 A 0.50005006 0.50005006 0 0 0 14.542969 12.986328 A 0.50005006 0.50005006 0 0 0 14.445312 12.988281 A 0.50005006 0.50005006 0 0 0 14.443359 12.988281 A 0.50005006 0.50005006 0 0 0 14.138672 13.140625 A 0.50005006 0.50005006 0 0 0 14.138672 13.142578 A 0.50005006 0.50005006 0 0 0 14.105469 13.179688 A 0.50005006 0.50005006 0 0 0 14.105469 13.181641 A 0.50005006 0.50005006 0 0 0 14.078125 13.220703 A 0.50005006 0.50005006 0 0 0 14.076172 13.222656 A 0.50005006 0.50005006 0 0 0 14.066406 13.240234 A 0.50005006 0.50005006 0 0 0 14.052734 13.263672 A 0.50005006 0.50005006 0 0 0 14.052734 13.265625 A 0.50005006 0.50005006 0 0 0 14.033203 13.310547 A 0.50005006 0.50005006 0 0 0 14.033203 13.3125 A 0.50005006 0.50005006 0 0 0 14.017578 13.357422 A 0.50005006 0.50005006 0 0 0 14.017578 13.359375 A 0.50005006 0.50005006 0 0 0 14.007812 13.40625 A 0.50005006 0.50005006 0 0 0 14.007812 13.408203 A 0.50005006 0.50005006 0 0 0 14.001953 13.457031 A 0.50005006 0.50005006 0 0 0 14.001953 13.492188 C 14.001966 14.028888 13.71676 14.522716 13.251953 14.791016 C 12.787157 15.059416 12.216749 15.059416 11.751953 14.791016 C 11.287146 14.522716 11.00194 14.028888 11.001953 13.492188 A 0.50005006 0.50005006 0 0 0 11 13.441406 A 0.50005006 0.50005006 0 0 0 10.853516 13.130859 A 0.50005006 0.50005006 0 0 0 10.818359 13.097656 A 0.50005006 0.50005006 0 0 0 10.816406 13.097656 A 0.50005006 0.50005006 0 0 0 10.542969 12.986328 A 0.50005006 0.50005006 0 0 0 10.445312 12.988281 A 0.50005006 0.50005006 0 0 0 10.443359 12.988281 A 0.50005006 0.50005006 0 0 0 10.138672 13.140625 A 0.50005006 0.50005006 0 0 0 10.138672 13.142578 A 0.50005006 0.50005006 0 0 0 10.105469 13.179688 A 0.50005006 0.50005006 0 0 0 10.105469 13.181641 A 0.50005006 0.50005006 0 0 0 10.078125 13.220703 A 0.50005006 0.50005006 0 0 0 10.076172 13.222656 A 0.50005006 0.50005006 0 0 0 10.066406 13.240234 A 0.50005006 0.50005006 0 0 0 10.052734 13.263672 A 0.50005006 0.50005006 0 0 0 10.052734 13.265625 A 0.50005006 0.50005006 0 0 0 10.033203 13.310547 A 0.50005006 0.50005006 0 0 0 10.033203 13.3125 A 0.50005006 0.50005006 0 0 0 10.017578 13.357422 A 0.50005006 0.50005006 0 0 0 10.017578 13.359375 A 0.50005006 0.50005006 0 0 0 10.007812 13.40625 A 0.50005006 0.50005006 0 0 0 10.007812 13.408203 A 0.50005006 0.50005006 0 0 0 10.001953 13.457031 A 0.50005006 0.50005006 0 0 0 10.001953 13.492188 C 10.001966 14.028888 9.7167605 14.522716 9.2519531 14.791016 C 8.7871573 15.059416 8.216749 15.059416 7.7519531 14.791016 C 7.2871459 14.522716 7.0019399 14.028888 7.0019531 13.492188 A 0.50005006 0.50005006 0 0 0 7 13.441406 A 0.50005006 0.50005006 0 0 0 6.8535156 13.130859 A 0.50005006 0.50005006 0 0 0 6.8183594 13.097656 A 0.50005006 0.50005006 0 0 0 6.8164062 13.097656 A 0.50005006 0.50005006 0 0 0 6.5429688 12.986328 A 0.50005006 0.50005006 0 0 0 6.4453125 12.988281 A 0.50005006 0.50005006 0 0 0 6.4433594 12.988281 A 0.50005006 0.50005006 0 0 0 6.1386719 13.140625 A 0.50005006 0.50005006 0 0 0 6.1386719 13.142578 A 0.50005006 0.50005006 0 0 0 6.1054688 13.179688 A 0.50005006 0.50005006 0 0 0 6.1054688 13.181641 A 0.50005006 0.50005006 0 0 0 6.078125 13.220703 A 0.50005006 0.50005006 0 0 0 6.0761719 13.222656 A 0.50005006 0.50005006 0 0 0 6.0664062 13.240234 A 0.50005006 0.50005006 0 0 0 6.0527344 13.263672 A 0.50005006 0.50005006 0 0 0 6.0527344 13.265625 A 0.50005006 0.50005006 0 0 0 6.0332031 13.310547 A 0.50005006 0.50005006 0 0 0 6.0332031 13.3125 A 0.50005006 0.50005006 0 0 0 6.0175781 13.357422 A 0.50005006 0.50005006 0 0 0 6.0175781 13.359375 A 0.50005006 0.50005006 0 0 0 6.0078125 13.40625 A 0.50005006 0.50005006 0 0 0 6.0078125 13.408203 A 0.50005006 0.50005006 0 0 0 6.0019531 13.457031 A 0.50005006 0.50005006 0 0 0 6.0019531 13.492188 C 6.0019663 14.028888 5.7167605 14.522716
                     5.2519531 14.791016 C 4.7871573 15.059416 4.216749 15.059416 3.7519531 14.791016 C 3.3086436 14.535125 3.0366537 14.072173 3.0117188 13.564453 L 5.4433594 7 z M 6.5019531 14.957031 C 6.70388 15.233168 6.9463241 15.481745 7.2519531 15.658203 C 8.0247617 16.104403 8.9791445 16.104403 9.7519531 15.658203 C 10.057582 15.481745 10.300026 15.233168 10.501953 14.957031 C 10.70388 15.233168 10.946324 15.481745 11.251953 15.658203 C 12.024762 16.104403 12.979145 16.104403 13.751953 15.658203 C 14.057582 15.481745 14.300026 15.233168 14.501953 14.957031 C 14.70388 15.233168 14.946324 15.481745 15.251953 15.658203 C 16.024762 16.104403 16.979145 16.104403 17.751953 15.658203 C 18.057582 15.481745 18.300026 15.233168 18.501953 14.957031 C 18.70388 15.233168 18.946324 15.481745 19.251953 15.658203 C 20.024762 16.104403 20.979145 16.104403 21.751953 15.658203 C 22.057582 15.481745 22.300026 15.233168 22.501953 14.957031 C 22.70388 15.233168 22.946324 15.481745 23.251953 15.658203 C 24.024762 16.104403 24.979145 16.104403 25.751953 15.658203 C 26.057582 15.481745 26.300026 15.233168 26.501953 14.957031 C 26.642628 15.149406 26.809294 15.317968 27.001953 15.464844 L 27.001953 29 L 13.001953 29 L 13.001953 22.494141 A 0.50005006 0.50005006 0 0 0 12.501953 21.994141 L 8.5019531 21.994141 A 0.50005006 0.50005006 0 0 0 8.0019531 22.494141 L 8.0019531 29 L 6.0019531 29 L 6.0019531 15.464844 C 6.1946122 15.317968 6.3612782 15.149406 6.5019531 14.957031 z M 17.501953 19 A 0.50005006 0.50005006 0 0 0 17.001953 19.5 L 17.001953 25.5 A 0.50005006 0.50005006 0 0 0 17.501953 26 L 24.501953 26 A 0.50005006 0.50005006 0 0 0 25.001953 25.5 L 25.001953 19.5 A 0.50005006 0.50005006 0 0 0 24.501953 19 L 17.501953 19 z M 18.001953 20 L 24.001953 20 L 24.001953 25 L 18.001953 25 L 18.001953 20 z " enableBackground="accumulate" fontFamily="sans-serif" fontWeight="400" overflow="visible"/></svg>
                    <p>المتجر</p>
                </Link>
            </div>
            {/* for small */}
            <div id="leftNav" className="scrollbar-hide min-h-screen overflow-y-scroll lg:hidden transition-all delay-75 duration-300 whitespace-nowrap 
            lg:w-6/12 z-30 bg-white xl:w-5/12 lg:flex-row left-0 top-0 w-0 fixed
            overflow-hidden lg:static h-full font-body font-semibold text-neutral-600 pb-20">
                <div className="leftNav flex h-5/6 flex-col justify-center items-center text-center w-full">
                    <div>
                        <Link to="/" className="hover:text-blue-600 text-sm transition-colors delay-100 duration-200">Home</Link>
                    </div>
                    <div>
                        <Link to="/TopProducts" className="hover:text-blue-600 text-sm transition-colors delay-100 duration-200">Top product</Link>
                    </div>
                    <div>
                        <Link to="/Myposts" className="hover:text-blue-600 delay-100 text-sm duration-200">My Posts</Link>
                    </div>
                    <div>
                        <Link to="/Contact" className="hover:text-blue-600 text-sm delay-100 duration-200">Contact us</Link>
                    </div>
                </div>
                <div className="h-px w-10/12 bg-stone-400 mx-auto my-5"></div>
                {isLogged&&<div className="w-full flex flex-col justify-center px-12 space-y-7">
                    <div className="flex space-x-3 items-center justify-start">
                        <img src={`./${userData.photo}`} className="rounded-full h-16 w-16" alt="photo profile"/>
                        <h2 className="font-bolder text-neutral-900">{userData.username}</h2>
                    </div>
                    <Link className="w-1/2" to={`/profile/${cookie.clid}`}><h3 className="hover:text-blue-700 delay-100 duration-200 transition-colors">Profile</h3></Link>
                    <Link className="w-1/2" to="/reportBug"><h3 className="hover:text-blue-700 delay-100 duration-200 transition-colors">report a bug</h3></Link>
                    <div onClick={logOut} className="w-1/2 text-red-600 text-lg font-bold cursor-pointer hover:text-red-700">
                        <p>Log out</p>
                    </div>
                </div>}
                
            </div>
            {!isLogged
            &&
            (<div className="flex xl:w-4/12 lg:w-3/12 w-20 items-center justify-center space-x-10 xl:space-x-20 font-body font-semibold text-neutral-700 tracking-wider">
                <Link to="/Login" className="hover:text-yellow-400 text-sm lg:whitespace-nowrap hover:underline underline-offset-2 delay-100 duration-200 decoration-yellow-400 text-center text-yellow-400">تسجيل الدخول</Link>
                <Link to="/Sign" className="hover:text-yellow-400 text-sm lg:whitespace-nowrap hidden lg:flex hover:bg-white delay-100 duration-200 border-2 text-white bg-yellow-400 border-yellow-400 py-1.5 px-3 rounded-sm">حساب جديد</Link>
            </div>)
            ||
            (<div className="xl:w-4/12 hidden font-body lg:flex lg:w-4/12 w-20 items-center justify-center space-x-8 tracking-wider">
               
                <img src="/icons/notification.png" className="w-8 h-8 lg:flex cursor-pointer box-content hover:rounded-full hover:border-0 hover:bg-stone-200 p-3" alt="notification"/>
                <div>
                    <img src="/icons/fleche.png" onClick={()=>{setShowMenu(!showMenu)}} className="w-10 h-10 cursor-pointer box-content rounded-full hover:border-0 hover:bg-stone-200 p-1" alt="options"/>
                    <NavDrop userData={userData} show={showMenu}/>
                </div>
            </div>)
            }
        </div>
        <Outlet></Outlet>
        </React.Fragment>
    )
}


const NavDrop=({userData,show})=>{
    const style={
        minHeight:show?"280px":"0" , 
        height:show?"auto":"0" , 
        padding:show?"":0
    }
    const [cookie, setCookie] = useCookies()
    const logOut=()=>{
        setCookie("clid","",{maxAge:0})
        window.location.reload()
    }
    return(
            <div style={style} className="overflow-hidden space-y-2 font-body w-2/6 border-0 p-3 bg-white shadow-lg shadow-neutral-400 rounded-md fixed right-14 z-50">
                <Link to={`/profile/${cookie.clid}`}><div className="profile-item hover:bg-stone-200 rounded-md p-2">
                    <img src={`./${userData.photo!="null"&&(userData.photo)||("./icons/user.png")}`} className="image w-16 h-16 rounded-full flex-none" alt="photo Profile"/>
                    <h2 className="username text-lg font-bold">{userData.username}</h2>   
                    <p className="text text-xs underline decoration-stone-600 font-semibold">Visit your Profile</p>
                </div></Link>
                <div className="h-px w-11/12 bg-neutral-200 mx-auto"></div>
                <div className="p-2 flex items-center hover:bg-stone-200 space-x-3 rounded-md cursor-pointer w-full">
                    <div className="rounded-full bg-stone-300 box-content p-3 flex-none">
                        <img src="./icons/bug.png" className="w-8 h-8" alt="logout"/>
                    </div>
                    <Link to="reportBug"><div>
                        <p className="text-md font-semibold leading-0">report a bug</p>
                        <p className="text-xs leading-0">Help us to improve application performance and keep advicing people</p>
                    </div></Link>
                </div>
                <div className="h-px w-11/12 bg-neutral-300 mx-auto"></div>
                <div onClick={logOut} className="p-2 flex items-center hover:bg-stone-200 space-x-3 rounded-md cursor-pointer w-full">
                    <div className="rounded-full bg-stone-300 box-content p-3 flex-none">
                        <img src="./icons/logout.png" className="w-8 h-8" alt="logout"/>
                    </div>
                    <p className="text-md font-semibold">Log Out</p>
                </div>
            </div>
    )
}
export default Nav