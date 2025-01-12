import React from 'react';
import MainSearch from '../search';
import MapLoader from '../../googleMap';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../../reusables/buttonIcon';
import blackMantaIcon from '../../../images/Matt_Manta_Black.png';
import whiteMantaIcon from '../../../images/Matt_Manta_White.png';
import style from './style.module.scss';
import Tabs from '../../reusables/tabs';
import Modal from '../../reusables/modal/modal';
import SelectedAreaPhotos from '../../selectedAreaPhotos';
import SelectedAreaDiveSites from '../../selectedAreaDiveSites';
import SelectedAreaDiveShops from '../../selectedAreaDiveShops';
import AppleLinkButton from '../../../images/AppleCTA.png';
import GoogleLinkButton from '../../../images/GoogleCTA.png';


type LayoutMainViewProps = {
  mapConfig:                number
  animateSitSubmitterModal: () => void
  animateProfileModal:      () => void
  animateSettingsModal:     () => void
};


export default function LayoutMainView(props: LayoutMainViewProps) {
  return (
    <div className="bg-white">
      <header>
        <div className="container-fluid">
          <div className="cols col-gapless">

            <div className="col-sm-12 col-4">
              <div className="main-logo col-6">
                <a href="index.html" className={style.mainLogo} style={{ color: 'black' }}>
                  <img src={blackMantaIcon} height={40} alt="logo" style={{ marginBottom: 5 }} />
                  Scuba SEAsons
                </a>
              </div>
            </div>

            <div className="col-sm-12 col-4">
              <MainSearch />
            </div>

            <div className="col-sm-12 col-4 flex-centered justify-content-sm-center justify-content-flex-start">

              <ul className={style.headerIcons}>
                <li>
                  <ButtonIcon
                    disabled={props.mapConfig === 0 ? false : true}
                    icon={<Icon name="person" color="blue" />}
                    className="text-primary"
                    onClick={props.animateProfileModal}
                  />
                </li>
                <li>
                  <ButtonIcon
                    disabled={props.mapConfig === 0 ? false : true}
                    icon={<Icon name="settings" color="blue" />}
                    className="text-primary"
                    onClick={props.animateSettingsModal}
                  />
                </li>
                <li style={{ marginTop: '-1px' }}>
                  <ButtonIcon
                    disabled={props.mapConfig === 0 ? false : true}
                    icon={<Icon name="anchor-plus" color="blue" />}
                    className="text-primary"
                    onClick={props.animateSitSubmitterModal}
                  />
                </li>
              </ul>

              <div className="cart text-end d-none d-lg-block dropdown">
                <button className="border-0 bg-transparent d-flex flex-column gap-2 lh-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                  <span className="fs-6 text-muted dropdown-toggle">Your Cart</span>
                  <span className="cart-total fs-5 fw-bold">$1290.00</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      <section className="py-2">
        <div className="container-fluid">
          <div className="cols col-gapless">
            <div className="col-md-12 col-4">
              <Tabs data={[
                { title: 'Animals', content: SelectedAreaPhotos },
                { title: 'DiveSites', content: SelectedAreaDiveSites },
                { title: 'DiveShops', content: SelectedAreaDiveShops },
                { title: 'Test', content: 'Lorem ipsum dolor sit amet' },
              ]}
              />

              {/* <div className="hero">
                <div className="hero-body">
                  <div className="bg-gray">AAA</div>
                </div>
                <div className="hero-body">
                  <div className="bg-gray">AAA</div>
                </div>
                <div className="hero-body">
                  <div className="bg-gray">AAA</div>
                </div>

              </div> */}
            </div>

            <div className="col-md-12 col-8">
              <div style={{ height: '100vh' }}>
                <MapLoader />
              </div>
            </div>
          </div>
        </div>


      </section>

      <footer className={style.footer}>
        <div className="container-fluid">
          <div className="cols col-gapless">

            <div className="cols col-12">
              <div className="col-12 py-2 pl-10 ml-10">
                <div className={style.lowerLogo}>
                  <img src={whiteMantaIcon} height={40} alt="logo" style={{ marginBottom: 5, marginRight: 7 }} />
                  Scuba SEAsons
                </div>
              </div>
              <div className="col-6 py-2">
                <div className={style.headers}>
                  Avilable on Mobile
                  <div className="mobile-links flex-centered  justify-content-sm-center justify-content-flex-start mt-5">
                    <a href="https://apps.apple.com/us/app/divego/id6450968950" target="_blank" rel="noreferrer">
                      <img  src={AppleLinkButton} height={60} />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.freem11.divegomobile" target="_blank" rel="noreferrer">
                      <img  src={GoogleLinkButton} height={60} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-6 py-2">
                <div className={style.headers}>
                  Connect with us
                  <div className="social-links flex-row-between justify-content-sm-center justify-content-flex-start mt-4 col-6">
                    <a href="https://www.facebook.com/profile.php?id=61554622375177" target="_blank" rel="noreferrer">
                      <ButtonIcon icon={<Icon name="facebook" color="white" style={{ scale: '2' }} />} />
                    </a>
                    <a href="https://www.instagram.com/scuba_seasons" target="_blank" rel="noreferrer">
                      <ButtonIcon icon={<Icon name="instagram" color="white" style={{ scale: '2' }} />} />
                    </a>
                    <a href="https://www.youtube.com/@ScubaSEAsons/videos" target="_blank" rel="noreferrer">
                      <ButtonIcon icon={<Icon name="youtube" color="white" style={{ scale: '2.5' }} />} />
                    </a>
                    <div onClick={() => window.location.href = 'mailto:scubaseasons@gmail.com'}>
                      <ButtonIcon icon={<Icon name="email-send-outline" color="white" style={{ scale: '2' }} />} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-2 py-2 pl-10 ml-6">
                <div className="col-md-6 copyright">
                  <p className={style.footerRights}>© 2025. All rights reserved.</p>
                </div>
              </div>
            </div>

            {/* <div className="col-md-2 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title">Explore</h5>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                    <a href="#" className="nav-link">Contries</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Regions</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Cities</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Parks</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Trails</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Points of Interest</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title">Maps</h5>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                    <a href="#" className="nav-link">My maps</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Create map</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Privacy Policy</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Print maps</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Route Converter</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title">Company</h5>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                    <a href="#" className="nav-link">About</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Jobs</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Press</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Ambassadors</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Affiliates</a>
                  </li>
                  <li className="menu-item">
                    <a href="#" className="nav-link">Influencers</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-3 col-md-6 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title">Comunity</h5>
                <p>Subscribe to our newsletter to get updates about our grand offers.</p>
                <form className="d-flex mt-3 gap-0" role="newsletter">
                  <input className="form-control rounded-start rounded-0 bg-light" type="email" placeholder="Email Address" aria-label="Email Address"></input>
                  <button className="btn btn-dark rounded-end rounded-0" type="submit">Subscribe</button>
                </form>
              </div>
            </div> */}

          </div>
        </div>
      </footer>
      <Modal />
    </div>
  );
}
