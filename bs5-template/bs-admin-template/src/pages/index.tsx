import * as React from 'react';
import type { HeadFC } from 'gatsby';
import Seo from '@src/components/Seo';
import Logo from '@src/assets/images/icons/logo.png';

const IndexPage: React.FC = () => {
  return (
    <>
      <nav className="navbar navbar-top fixed-top navbar-expand">
        <div className="collapse navbar-collapse justify-content-between">
          <div className="navbar-logo">
            <button
              className="btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarVerticalCollapse"
              aria-controls="navbarVerticalCollapse"
              aria-expanded="false"
              aria-label="Toggle Navigation"
            >
              <span className="navbar-toggle-icon">
                <span className="toggle-line"></span>
              </span>
            </button>
            <a className="navbar-brand me-1 me-sm-3" href="../index.html">
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <img src={Logo} width="27" />
                  <p className="logo-text ms-2 d-none d-sm-block">phoenix</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </nav>
      <div className="content">
        <nav className="mb-2" aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active">Members</li>
          </ol>
        </nav>

        <h2 className="text-bold text-1100 mb-5">Members</h2>

        <div id="members">
          <div className="row align-items-center justify-content-between g-3 mb-4">
            <div className="col col-auto">
              <div className="search-box">
                <form
                  className="position-relative"
                  data-bs-toggle="search"
                  data-bs-display="static"
                >
                  <input
                    className="form-control search-input search"
                    type="search"
                    placeholder="Search members"
                    aria-label="Search"
                  />
                  <span className="fas fa-search search-box-icon"></span>
                </form>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex align-items-center">
                <button className="btn btn-link text-900 me-4 px-0">
                  <span className="fa-solid fa-file-export fs--1 me-2"></span>
                  Export
                </button>
                <button className="btn btn-primary">
                  <span className="fas fa-plus me-2"></span>Add member
                </button>
              </div>
            </div>
          </div>

          <div className="mx-n4 mx-lg-n6 px-4 px-lg-6 mb-9 bg-white border-y border-300 mt-2 position-relative top-1">
            <div className="table-responsive scrollbar ms-n1 ps-1">
              <table className="table table-sm fs--1 mb-0">
                <thead>
                  <tr>
                    <th className="white-space-nowrap fs--1 align-middle ps-0">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          id="checkbox-bulk-members-select"
                          type="checkbox"
                          data-bulk-select='{"body":"members-table-body"}'
                        />
                      </div>
                    </th>
                    <th
                      className="sort align-middle"
                      scope="col"
                      data-sort="customer"
                    >
                      CUSTOMER
                    </th>
                    <th
                      className="sort align-middle"
                      scope="col"
                      data-sort="email"
                    >
                      EMAIL
                    </th>
                    <th
                      className="sort align-middle pe-3"
                      scope="col"
                      data-sort="mobile_number"
                    >
                      MOBILE NUMBER
                    </th>
                    <th
                      className="sort align-middle"
                      scope="col"
                      data-sort="city"
                    >
                      CITY
                    </th>
                    <th
                      className="sort align-middle text-end"
                      scope="col"
                      data-sort="last_active"
                    >
                      LAST ACTIVE
                    </th>
                    <th
                      className="sort align-middle text-end pe-0"
                      scope="col"
                      data-sort="joined"
                    >
                      JOINED
                    </th>
                  </tr>
                </thead>
                <tbody className="list" id="members-table-body">
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/32.webp","name":"Carry Anna"},"email":"annac34@gmail.com","mobile":"+912346578","city":"Budapest","lastActive":"34 min ago","joined":"Dec 12, 12:56 PM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle"
                            src="../assets/images/team/32.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">Carry Anna</h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:annac34@gmail.com"
                      >
                        annac34@gmail.com
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a className="fw-bold text-1100" href="tel:+912346578">
                        +912346578
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      Budapest
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      34 min ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Dec 12, 12:56 PM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/avatar.webp","name":"Milind Mikuja","placeholder":true},"email":"mimiku@yahoo.com","mobile":"+8801564768976","city":"Manchester","lastActive":"6 hours ago","joined":"Dec 9, 2:28 PM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle avatar-placeholder"
                            src="../assets/images/team/avatar.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">
                          Milind Mikuja
                        </h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:mimiku@yahoo.com"
                      >
                        mimiku@yahoo.com
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a
                        className="fw-bold text-1100"
                        href="tel:+8801564768976"
                      >
                        +8801564768976
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      Manchester
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      6 hours ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Dec 9, 2:28 PM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/35.webp","name":"Stanly Drinkwater"},"email":"stnlwasser@hotmail.com","mobile":"+78675436798","city":"Smallville","lastActive":"43 min ago","joined":"Dec 4, 12:56 PM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle"
                            src="../assets/images/team/35.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">
                          Stanly Drinkwater
                        </h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:stnlwasser@hotmail.com"
                      >
                        stnlwasser@hotmail.com
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a className="fw-bold text-1100" href="tel:+78675436798">
                        +78675436798
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      Smallville
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      43 min ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Dec 4, 12:56 PM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/57.webp","name":"Josef Stravinsky"},"email":"Josefsky@sni.it","mobile":"+118796567894","city":"Metropolis","lastActive":"2 hours ago","joined":"Dec 1,  4:07 AM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle"
                            src="../assets/images/team/57.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">
                          Josef Stravinsky
                        </h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a className="fw-semi-bold" href="mailto:Josefsky@sni.it">
                        Josefsky@sni.it
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a className="fw-bold text-1100" href="tel:+118796567894">
                        +118796567894
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      Metropolis
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      2 hours ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Dec 1, 4:07 AM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/58.webp","name":"Igor Borvibson"},"email":"vibigorr@technext.it","mobile":"+65899655678","city":"Central city","lastActive":"5 days ago","joined":"Nov 28, 7:28 PM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle"
                            src="../assets/images/team/58.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">
                          Igor Borvibson
                        </h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:vibigorr@technext.it"
                      >
                        vibigorr@technext.it
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a className="fw-bold text-1100" href="tel:+65899655678">
                        +65899655678
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      Central city
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      5 days ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Nov 28, 7:28 PM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/59.webp","name":"Katerina Karenin"},"email":"karkat99@gmail.com","mobile":"+00564327890","city":"Gotham","lastActive":"2 weeks ago","joined":"Nov 24, 10:16 AM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle"
                            src="../assets/images/team/59.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">
                          Katerina Karenin
                        </h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:karkat99@gmail.com"
                      >
                        karkat99@gmail.com
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a className="fw-bold text-1100" href="tel:+00564327890">
                        +00564327890
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      Gotham
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      2 weeks ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Nov 24, 10:16 AM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"","name":"Roy Anderson"},"email":"andersonroy@netflix.chill","mobile":"+55890776","city":"Vancouver","lastActive":"4 days ago","joined":"Nov 18, 5:43 PM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <div className="avatar-name rounded-circle">
                            <span>R</span>
                          </div>
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">Roy Anderson</h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:andersonroy@netflix.chill"
                      >
                        andersonroy@netflix.chill
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a className="fw-bold text-1100" href="tel:+55890776">
                        +55890776
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      Vancouver
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      4 days ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Nov 18, 5:43 PM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/31.webp","name":"Martina scorcese"},"email":"cesetina1@gmail.com","mobile":"+666611896","city":"Viena","lastActive":"6 min ago","joined":"Nov 18, 2:09 AM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle"
                            src="../assets/images/team/31.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">
                          Martina scorcese
                        </h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:cesetina1@gmail.com"
                      >
                        cesetina1@gmail.com
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a className="fw-bold text-1100" href="tel:+666611896">
                        +666611896
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      Viena
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      6 min ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Nov 18, 2:09 AM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/33.webp","name":"Luis Bunuel"},"email":"luisuel@live.com","mobile":"+55786534","city":"Bangalore","lastActive":"56 min ago","joined":"Nov 16, 3:22 PM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle"
                            src="../assets/images/team/33.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">Luis Bunuel</h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:luisuel@live.com"
                      >
                        luisuel@live.com
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a className="fw-bold text-1100" href="tel:+55786534">
                        +55786534
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      Bangalore
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      56 min ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Nov 16, 3:22 PM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/34.webp","name":"Jean Renoir"},"email":"renoirjean1836@gmail.com","mobile":"+8801765458767","city":"Chittagong","lastActive":"Yesterday","joined":"Nov 09, 8:49 AM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle"
                            src="../assets/images/team/34.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">Jean Renoir</h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:renoirjean1836@gmail.com"
                      >
                        renoirjean1836@gmail.com
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a
                        className="fw-bold text-1100"
                        href="tel:+8801765458767"
                      >
                        +8801765458767
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      Chittagong
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      Yesterday
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Nov 09, 8:49 AM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/29.webp","name":"Ricky Antony"},"email":"ricky@example.com","mobile":"+2012001851","city":"New Jersey","lastActive":"1 hour ago","joined":"Oct 19, 8:00 AM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle"
                            src="../assets/images/team/29.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">Ricky Antony</h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:ricky@example.com"
                      >
                        ricky@example.com
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a className="fw-bold text-1100" href="tel:+2012001851">
                        +2012001851
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      New Jersey
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      1 hour ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Oct 19, 8:00 AM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/3.webp","name":"Emma Watson"},"email":"emma@example.com","mobile":"+2122288403","city":"New York","lastActive":"6 hours ago","joined":"Oct 15, 12:00 PM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle"
                            src="../assets/images/team/3.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">Emma Watson</h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:emma@example.com"
                      >
                        emma@example.com
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a className="fw-bold text-1100" href="tel:+2122288403">
                        +2122288403
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      New York
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      6 hours ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Oct 15, 12:00 PM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/avatar.webp","name":"Jennifer Schramm","placeholder":true},"email":"jennifer@example.com","mobile":"+8283829631","city":"Charlotte","lastActive":"12 hours ago","joined":"Oct 12, 11:00 AM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle avatar-placeholder"
                            src="../assets/images/team/avatar.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">
                          Jennifer Schramm
                        </h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:jennifer@example.com"
                      >
                        jennifer@example.com
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a className="fw-bold text-1100" href="tel:+8283829631">
                        +8283829631
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      Charlotte
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      12 hours ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Oct 12, 11:00 AM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/32.webp","name":"Raymond Mims"},"email":"raymond@example.com","mobile":"+5624685646","city":"Artesia","lastActive":"2 day ago","joined":"Oct 10, 8:30 AM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle"
                            src="../assets/images/team/32.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">Raymond Mims</h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:raymond@example.com"
                      >
                        raymond@example.com
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a className="fw-bold text-1100" href="tel:+5624685646">
                        +5624685646
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      Artesia
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      2 day ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Oct 10, 8:30 AM
                    </td>
                  </tr>
                  <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                    <td className="fs--1 align-middle ps-0 py-3">
                      <div className="form-check mb-0 fs-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          data-bulk-select-row='{"customer":{"avatar":"/team/25.webp","name":"Michael Jenkins"},"email":"jenkins@example.com","mobile":"+3026138829","city":"Philadelphia","lastActive":"12 hours ago","joined":"Oct 3, 8:30 AM"}'
                        />
                      </div>
                    </td>
                    <td className="customer align-middle white-space-nowrap">
                      <a
                        className="d-flex align-items-center text-900 text-hover-1000"
                        href="#!"
                      >
                        <div className="avatar avatar-m">
                          <img
                            className="rounded-circle"
                            src="../assets/images/team/25.webp"
                            alt=""
                          />
                        </div>
                        <h6 className="mb-0 ms-3 fw-semi-bold">
                          Michael Jenkins
                        </h6>
                      </a>
                    </td>
                    <td className="email align-middle white-space-nowrap">
                      <a
                        className="fw-semi-bold"
                        href="mailto:jenkins@example.com"
                      >
                        jenkins@example.com
                      </a>
                    </td>
                    <td className="mobile_number align-middle white-space-nowrap">
                      <a className="fw-bold text-1100" href="tel:+3026138829">
                        +3026138829
                      </a>
                    </td>
                    <td className="city align-middle white-space-nowrap text-900">
                      Philadelphia
                    </td>
                    <td className="last_active align-middle text-end white-space-nowrap text-700">
                      12 hours ago
                    </td>
                    <td className="joined align-middle white-space-nowrap text-700 text-end">
                      Oct 3, 8:30 AM
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="row align-items-center justify-content-between py-2 pe-0 fs--1">
              <div className="col-auto d-flex">
                <p className="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900"></p>
                <a className="fw-semi-bold" href="#">
                  View all<span className="fas fa-angle-right ms-1"></span>
                </a>
                <a className="fw-semi-bold d-none" href="#">
                  View Less<span className="fas fa-angle-right ms-1"></span>
                </a>
              </div>
              <div className="col-auto d-flex">
                <button className="page-link">
                  <span className="fas fa-chevron-left"></span>
                </button>
                <ul className="mb-0 pagination"></ul>
                <button className="page-link pe-0" data-list-pagination="next">
                  <span className="fas fa-chevron-right"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer position-absolute">
          <div className="row g-0 justify-content-between align-items-center h-100">
            <div className="col-12 col-sm-auto text-center">
              <p className="mb-0 mt-2 mt-sm-0 text-900">
                Thank you for creating with Adonis
                <span className="d-none d-sm-inline-block"></span>
                <span className="d-none d-sm-inline-block mx-1">|</span>
                <br className="d-sm-none" />
                2023 &copy;
                <a className="mx-1" href="https://adonis.com">
                  Adonis
                </a>
              </p>
            </div>
            <div className="col-12 col-sm-auto text-center">
              <p className="mb-0 text-600">v1.0.0</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <Seo />;
