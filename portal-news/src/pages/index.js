import * as React from 'react';

const IndexPage = () => {
  return (
    <>
      <header>
        <div className="header-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-6 header-top-left no-padding">
                <ul>
                  <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                  <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                  <li><a href="#"><i className="fa fa-behance"></i></a></li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-6 header-top-right no-padding">
                <ul>
                  <li><a href="tel:+440 012 3654 896"><span className="lnr lnr-phone-handset"></span><span>+440 012 3654 896</span></a>
                  </li>
                  <li><a href="mailto:support@colorlib.com"><span
                    className="lnr lnr-envelope"></span><span>support@colorlib.com</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="logo-wrap">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-4 col-md-4 col-sm-12 logo-left no-padding">
                <a href="index.html">
                  <img className="img-fluid" src="img/logo.png" alt=""/>
                </a>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12 logo-right no-padding ads-banner">
                <img className="img-fluid" src="img/banner-ad.jpg" alt=""/>
              </div>
            </div>
          </div>
        </div>
        <div className="container main-menu" id="main-menu">
          <div className="row align-items-center justify-content-between">
            <nav id="nav-menu-container">
              <ul className="nav-menu">
                <li className="menu-active"><a href="index.html">Home</a></li>
                <li className="menu-has-children"><a href="">Category</a>
                  <ul>
                    <li><a href="#">Category1</a></li>
                    <li><a href="#">Category2</a></li>
                    <li><a href="#">Category3</a></li>
                    <li><a href="#">Category4</a></li>
                  </ul>
                </li>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </nav>
            {/* #nav-menu-container */}
            <div className="navbar-right">
              <form className="Search">
                <input type="text" className="form-control Search-box" name="Search-box" id="Search-box"
                       placeholder="Search"/>
                <label htmlFor="Search-box" className="Search-box-label">
                  <span className="lnr lnr-magnifier"></span>
                </label>
                <span className="Search-close">
                  <span className="lnr lnr-cross"></span>
                </span>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="site-main-container">
        {/* Start top-post Area */}
        <section className="top-post-area pt-10">
          <div className="container no-padding">
            <div className="row small-gutters">
              <div className="col-lg-8 top-post-left">
                <div className="feature-image-thumb relative">
                  <div className="overlay overlay-bg"></div>
                  <img className="img-fluid" src="img/top-post1.jpg" alt=""/>
                </div>
                <div className="top-post-details">
                  <ul className="tags">
                    <li><a href="#">Food Habit</a></li>
                  </ul>
                  <a href="image-post.html">
                    <h3>A Discount Toner Cartridge Is Better Than Ever.</h3>
                  </a>
                  <ul className="meta">
                    <li><a href="#"><span className="lnr lnr-user"></span>Mark wiens</a></li>
                    <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                    <li><a href="#"><span className="lnr lnr-bubble"></span>06 Comments</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 top-post-right">
                <div className="single-top-post">
                  <div className="feature-image-thumb relative">
                    <div className="overlay overlay-bg"></div>
                    <img className="img-fluid" src="img/top-post2.jpg" alt=""/>
                  </div>
                  <div className="top-post-details">
                    <ul className="tags">
                      <li><a href="#">Food Habit</a></li>
                    </ul>
                    <a href="image-post.html">
                      <h4>A Discount Toner Cartridge Is Better Than Ever.</h4>
                    </a>
                    <ul className="meta">
                      <li><a href="#"><span className="lnr lnr-user"></span>Mark wiens</a></li>
                      <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                      <li><a href="#"><span className="lnr lnr-bubble"></span>06 Comments</a></li>
                    </ul>
                  </div>
                </div>
                <div className="single-top-post mt-10">
                  <div className="feature-image-thumb relative">
                    <div className="overlay overlay-bg"></div>
                    <img className="img-fluid" src="img/top-post3.jpg" alt=""/>
                  </div>
                  <div className="top-post-details">
                    <ul className="tags">
                      <li><a href="#">Food Habit</a></li>
                    </ul>
                    <a href="image-post.html">
                      <h4>A Discount Toner Cartridge Is Better</h4>
                    </a>
                    <ul className="meta">
                      <li><a href="#"><span className="lnr lnr-user"></span>Mark wiens</a></li>
                      <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                      <li><a href="#"><span className="lnr lnr-bubble"></span>06 Comments</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End top-post Area */}
        {/* Start latest-post Area */}
        <section className="latest-post-area pb-120">
          <div className="container no-padding">
            <div className="row">
              <div className="col-lg-8 post-list">
                {/* Start latest-post Area */}
                <div className="latest-post-wrap">
                  <h4 className="cat-title">Latest News</h4>
                  <div className="single-latest-post row align-items-center">
                    <div className="col-lg-5 post-left">
                      <div className="feature-img relative">
                        <div className="overlay overlay-bg"></div>
                        <img className="img-fluid" src="img/l1.jpg" alt=""/>
                      </div>
                      <ul className="tags">
                        <li><a href="#">Lifestyle</a></li>
                      </ul>
                    </div>
                    <div className="col-lg-7 post-right">
                      <a href="image-post.html">
                        <h4>A Discount Toner Cartridge Is
                          Better Than Ever.</h4>
                      </a>
                      <ul className="meta">
                        <li><a href="#"><span className="lnr lnr-user"></span>Mark wiens</a></li>
                        <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                        <li><a href="#"><span className="lnr lnr-bubble"></span>06 Comments</a></li>
                      </ul>
                      <p className="excert">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                      </p>
                    </div>
                  </div>
                  <div className="single-latest-post row align-items-center">
                    <div className="col-lg-5 post-left">
                      <div className="feature-img relative">
                        <div className="overlay overlay-bg"></div>
                        <img className="img-fluid" src="img/l2.jpg" alt=""/>
                      </div>
                      <ul className="tags">
                        <li><a href="#">Science</a></li>
                      </ul>
                    </div>
                    <div className="col-lg-7 post-right">
                      <a href="image-post.html">
                        <h4>A Discount Toner Cartridge Is
                          Better Than Ever.</h4>
                      </a>
                      <ul className="meta">
                        <li><a href="#"><span className="lnr lnr-user"></span>Mark wiens</a></li>
                        <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                        <li><a href="#"><span className="lnr lnr-bubble"></span>06 Comments</a></li>
                      </ul>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                      </p>
                    </div>
                  </div>
                  <div className="single-latest-post row align-items-center">
                    <div className="col-lg-5 post-left">
                      <div className="feature-img relative">
                        <div className="overlay overlay-bg"></div>
                        <img className="img-fluid" src="img/l3.jpg" alt=""/>
                      </div>
                      <ul className="tags">
                        <li><a href="#">Travel</a></li>
                      </ul>
                    </div>
                    <div className="col-lg-7 post-right">
                      <a href="image-post.html">
                        <h4>A Discount Toner Cartridge Is
                          Better Than Ever.</h4>
                      </a>
                      <ul className="meta">
                        <li><a href="#"><span className="lnr lnr-user"></span>Mark wiens</a></li>
                        <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                        <li><a href="#"><span className="lnr lnr-bubble"></span>06 Comments</a></li>
                      </ul>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                      </p>
                    </div>
                  </div>
                  <div className="single-latest-post row align-items-center">
                    <div className="col-lg-5 post-left">
                      <div className="feature-img relative">
                        <div className="overlay overlay-bg"></div>
                        <img className="img-fluid" src="img/l4.jpg" alt=""/>
                      </div>
                      <ul className="tags">
                        <li><a href="#">Fashion</a></li>
                      </ul>
                    </div>
                    <div className="col-lg-7 post-right">
                      <a href="image-post.html">
                        <h4>A Discount Toner Cartridge Is
                          Better Than Ever.</h4>
                      </a>
                      <ul className="meta">
                        <li><a href="#"><span className="lnr lnr-user"></span>Mark wiens</a></li>
                        <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                        <li><a href="#"><span className="lnr lnr-bubble"></span>06 Comments</a></li>
                      </ul>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                      </p>
                    </div>
                  </div>
                </div>
                {/* End latest-post Area */}

                {/* Start banner-ads Area */}
                <div className="col-lg-12 ad-widget-wrap mt-30 mb-30">
                  <img className="img-fluid" src="img/banner-ad.jpg" alt=""/>
                </div>
                {/* End banner-ads Area */}
                {/* Start popular-post Area */}
                <div className="popular-post-wrap">
                  <h4 className="title">Popular Posts</h4>
                  <div className="feature-post relative">
                    <div className="feature-img relative">
                      <div className="overlay overlay-bg"></div>
                      <img className="img-fluid" src="img/f1.jpg" alt=""/>
                    </div>
                    <div className="details">
                      <ul className="tags">
                        <li><a href="#">Food Habit</a></li>
                      </ul>
                      <a href="image-post.html">
                        <h3>A Discount Toner Cartridge Is Better Than Ever.</h3>
                      </a>
                      <ul className="meta">
                        <li><a href="#"><span className="lnr lnr-user"></span>Mark wiens</a></li>
                        <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                        <li><a href="#"><span className="lnr lnr-bubble"></span>06 Comments</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="row mt-20 medium-gutters">
                    <div className="col-lg-6 single-popular-post">
                      <div className="feature-img-wrap relative">
                        <div className="feature-img relative">
                          <div className="overlay overlay-bg"></div>
                          <img className="img-fluid" src="img/f2.jpg" alt=""/>
                        </div>
                        <ul className="tags">
                          <li><a href="#">Travel</a></li>
                        </ul>
                      </div>
                      <div className="details">
                        <a href="image-post.html">
                          <h4>A Discount Toner Cartridge Is
                            Better Than Ever.</h4>
                        </a>
                        <ul className="meta">
                          <li><a href="#"><span className="lnr lnr-user"></span>Mark wiens</a></li>
                          <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                          <li><a href="#"><span className="lnr lnr-bubble"></span>06 </a></li>
                        </ul>
                        <p className="excert">
                          Lorem ipsum dolor sit amet, consecteturadip isicing elit, sed do eiusmod tempor incididunt ed
                          do eius.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6 single-popular-post">
                      <div className="feature-img-wrap relative">
                        <div className="feature-img relative">
                          <div className="overlay overlay-bg"></div>
                          <img className="img-fluid" src="img/f3.jpg" alt=""/>
                        </div>
                        <ul className="tags">
                          <li><a href="#">Travel</a></li>
                        </ul>
                      </div>
                      <div className="details">
                        <a href="image-post.html">
                          <h4>A Discount Toner Cartridge Is
                            Better Than Ever.</h4>
                        </a>
                        <ul className="meta">
                          <li><a href="#"><span className="lnr lnr-user"></span>Mark wiens</a></li>
                          <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                          <li><a href="#"><span className="lnr lnr-bubble"></span>06 </a></li>
                        </ul>
                        <p className="excert">
                          Lorem ipsum dolor sit amet, consecteturadip isicing elit, sed do eiusmod tempor incididunt ed
                          do eius.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End popular-post Area */}
              </div>
              <div className="col-lg-4">
                <div className="sidebars-area">
                  <div className="single-sidebar-widget most-popular-widget">
                    <h6 className="title">Most Popular</h6>
                    <div className="single-list flex-row d-flex">
                      <div className="thumb">
                        <img src="img/m1.jpg" alt=""/>
                      </div>
                      <div className="details">
                        <a href="image-post.html">
                          <h6>Help Finding Information
                            Online is so easy</h6>
                        </a>
                        <ul className="meta">
                          <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                          <li><a href="#"><span className="lnr lnr-bubble"></span>06</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="single-list flex-row d-flex">
                      <div className="thumb">
                        <img src="img/m2.jpg" alt=""/>
                      </div>
                      <div className="details">
                        <a href="image-post.html">
                          <h6>Compatible Inkjet Cartr
                            world famous</h6>
                        </a>
                        <ul className="meta">
                          <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                          <li><a href="#"><span className="lnr lnr-bubble"></span>06</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="single-list flex-row d-flex">
                      <div className="thumb">
                        <img src="img/m3.jpg" alt=""/>
                      </div>
                      <div className="details">
                        <a href="image-post.html">
                          <h6>5 Tips For Offshore Soft
                            Development </h6>
                        </a>
                        <ul className="meta">
                          <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                          <li><a href="#"><span className="lnr lnr-bubble"></span>06</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="single-list flex-row d-flex">
                      <div className="thumb">
                        <img src="img/m4.jpg" alt=""/>
                      </div>
                      <div className="details">
                        <a href="image-post.html">
                          <h6>5 Tips For Offshore Soft
                            Development </h6>
                        </a>
                        <ul className="meta">
                          <li><a href="#"><span className="lnr lnr-calendar-full"></span>03 April, 2018</a></li>
                          <li><a href="#"><span className="lnr lnr-bubble"></span>06</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="single-sidebar-widget social-network-widget">
                    <h6 className="title">Social Networks</h6>
                    <ul className="social-list">
                      <li className="d-flex justify-content-between align-items-center fb">
                        <div className="icons d-flex flex-row align-items-center">
                          <i className="fa fa-facebook" aria-hidden="true"></i>
                          <p>983 Likes</p>
                        </div>
                        <a href="#">Like our page</a>
                      </li>
                      <li className="d-flex justify-content-between align-items-center tw">
                        <div className="icons d-flex flex-row align-items-center">
                          <i className="fa fa-twitter" aria-hidden="true"></i>
                          <p>983 Followers</p>
                        </div>
                        <a href="#">Follow Us</a>
                      </li>
                      <li className="d-flex justify-content-between align-items-center yt">
                        <div className="icons d-flex flex-row align-items-center">
                          <i className="fa fa-youtube-play" aria-hidden="true"></i>
                          <p>983 Subscriber</p>
                        </div>
                        <a href="#">Subscribe</a>
                      </li>
                      <li className="d-flex justify-content-between align-items-center rs">
                        <div className="icons d-flex flex-row align-items-center">
                          <i className="fa fa-rss" aria-hidden="true"></i>
                          <p>983 Subscribe</p>
                        </div>
                        <a href="#">Subscribe</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End latest-post Area */}
      </div>

      {/* start footer Area */}
      <footer className="footer-area section-gap">
        <div className="container">
          <div className="footer-bottom row align-items-center">
            <p
              className="footer-text m-0 col-lg-8 col-md-12">{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              Copyright &copy;
              <script>document.write(new Date().getFullYear());</script>
              All rights reserved | This template is made with <i className="fa fa-heart-o"
                                                                  aria-hidden="true"></i> by <a
                href="https://colorlib.com" target="_blank">Colorlib</a>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
            <div className="col-lg-4 col-md-12 footer-social">
              <a href="#"><i className="fa fa-facebook"></i></a>
              <a href="#"><i className="fa fa-twitter"></i></a>
              <a href="#"><i className="fa fa-dribbble"></i></a>
              <a href="#"><i className="fa fa-behance"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default IndexPage;

export const Head = () =>
  <title>Home Page</title>;

