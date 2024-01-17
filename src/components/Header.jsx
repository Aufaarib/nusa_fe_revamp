import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";

const Header = ({ home, prev, at, navHome, navPrev, title, icon }) => (
  <div style={{ borderBottom: "1px solid gray", marginBottom: "10px" }}>
    <div style={{ marginBottom: "20px" }}>
      <Breadcrumbs className="capitalize">
        <Typography fontSize="14px" color="gray" href={navHome}>
          {home}
        </Typography>
        {prev && (
          <Link underline="hover" href="/pmb/tahapan-pmb">
            <Typography fontSize="14px" color="gray">
              {prev}
            </Typography>
          </Link>
        )}
        {at && (
          <Typography fontSize="14px" color="#8F0D1E">
            {at}
          </Typography>
        )}
      </Breadcrumbs>
      <h1 className="mt-3 xs:text-xl md:text-2xl lg:text-3xl placeholder:tracking-tight text-hitam ">
        <span className="xs:hidden md:inline-block">{icon}</span>
        {title}
      </h1>
    </div>
  </div>
);

export default Header;
