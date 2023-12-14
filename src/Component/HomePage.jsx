import React from 'react'
import SlideShow from './SlideShow'
import CategoryHome from './CategoryHome'
import RecommendedHome from './RecommendedHome'
import AboutHome from './AboutHome'
import Footer from './Footer'
import Category from './Category'
import Banner from './Banner'
import ScrollToTop from './ScrollToTop'
const HomePage = (props) => {
  return (
    <>
    <ScrollToTop/>
    <SlideShow/>
    <CategoryHome/>
    <Banner/>
    <RecommendedHome showAlert={props.showAlert}/>
    <AboutHome/>
    <Footer/>
    </>
  )
}

export default HomePage