"use client";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import MenuIcon from "@mui/icons-material/Menu";
import profileImg from "../../lib/assets/img/profile.jpg";
import Link from "next/link";
import Image from "next/image";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Menu,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  MenuItem,
} from "@mui/material";

interface Page {
  title: string;
  link: string;
}

// 1. Statik Veriler
const pages: Page[] = [
  { title: "ANASAYFA", link: "/" },
  { title: "PROJELER", link: "projeler" },
  { title: "ÖDEMELER", link: "odemeler" },
  { title: "İŞLETMELER", link: "isletmeler" },
];

const commonTitleStyles = {
  mr: 2,
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
};

const NavBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    handleCloseUserMenu();
    signOut({ callbackUrl: "/login", redirect: true });
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo ve Başlık (Masaüstü) */}
          <ArchitectureIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{ display: { xs: "none", md: "flex" }, ...commonTitleStyles }}
          >
            ALTAN - WORKAPP
          </Typography>

          {/* Mobil Menü Butonu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="Toggle navigation menu"
              aria-controls="menu-appbar-nav"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar-nav"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {/* Mobil Navigasyon Öğeleri - Link ve onClick Temizliği */}
              {pages.map(({ title, link }) => (
                <MenuItem
                  key={title}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={link === "/" ? "/" : `/${link}`}
                >
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo ve Başlık (Mobil) */}
          <ArchitectureIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              ...commonTitleStyles,
            }}
          >
            Mehmet ALTAN
          </Typography>

          {/* Masaüstü Navigasyon Butonları - Link Kullanımı */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              gap: "1rem",
              marginRight: "4rem",
            }}
          >
            {pages.map(({ title, link }) => (
              <Button
                key={title}
                component={Link}
                href={link === "/" ? "/" : `/${link}`}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
              >
                {title}
              </Button>
            ))}
          </Box>

          {/* Kullanıcı Profili ve Ayarlar Menüsü */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Box
                sx={{
                  position: "relative",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={profileImg}
                  fill={true}
                  alt="profilepic"
                  sizes="50px"
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar-user"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* Kullanıcı Menüsü Öğeleri - Link ve onClick Temizliği */}
              <MenuItem
                onClick={handleCloseUserMenu}
                component={Link}
                href={"/parametreler"}
              >
                <Typography textAlign="center">Parametreler</Typography>
              </MenuItem>

              <MenuItem
                onClick={handleCloseUserMenu}
                component={Link}
                href={"/register"}
              >
                <Typography textAlign="center">Yeni Kullanıcı</Typography>
              </MenuItem>

              <MenuItem onClick={handleSignOut}>
                <Typography textAlign="center">Çıkış Yap</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
