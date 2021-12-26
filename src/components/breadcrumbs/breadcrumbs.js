import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import "./breadcrumbs.css";

export default function SimpleBreadcrumbs({ navigate }) {
  const breadcrumbsData = [
    {
      label: "Searching",
      href: "/",
    },
    {
      onClick: () => {
        const path = window.location.pathname.split("/").slice(1, 3);
        navigate(`/${path[0]}/${path[1]}`);
      },
      label: "Authors",
    },
    {
      onClick: () => {
        const path = window.location.pathname.split("/").slice(1, 5);
        navigate(`/${path[0]}/${path[1]}/${path[2]}/${path[3]}`);
      },
      label: "Books",
    },
    {
      onClick: () => {},
      label: "Detail",
    },
  ];

  const renderBreadcrumb = () => {
    const arr = window.location.pathname.split("/").slice(1, 6);
    if (arr.length === 5) {
      return breadcrumbsData.map((x, index) => (
        <React.Fragment key={index}>
          {index === 3 ? (
            <Typography color="textPrimary">{x.label}</Typography>
          ) : (
            <Link
              key={index}
              color="inherit"
              onClick={x.onClick}
              href={x.href ? x.href : ""}
            >
              {x.label}
            </Link>
          )}
        </React.Fragment>
      ));
    } else if (arr.length === 4) {
      return breadcrumbsData.map((x, index) => (
        <React.Fragment key={index}>
          {index > 2 ? null : index === 2 ? (
            <Typography color="textPrimary">{x.label}</Typography>
          ) : (
            <Link
              key={index}
              color="inherit"
              href={x.href}
              onClick={x.onClick}
              href={x.href ? x.href : ""}
            >
              {x.label}
            </Link>
          )}
        </React.Fragment>
      ));
    } else if (arr.length === 2) {
      return breadcrumbsData.map((x, index) => (
        <React.Fragment key={index}>
          {index > 1 ? null : index === 1 ? (
            <Typography color="textPrimary">{x.label}</Typography>
          ) : (
            <Link
              key={index}
              color="inherit"
              href={x.href}
              onClick={x.onClick}
              href={x.href ? x.href : ""}
            >
              {x.label}
            </Link>
          )}
        </React.Fragment>
      ));
    } else return <Typography color="textPrimary">Searching</Typography>;
  };
  return (
    <Breadcrumbs aria-label="breadcrumb">{renderBreadcrumb()}</Breadcrumbs>
  );
}
