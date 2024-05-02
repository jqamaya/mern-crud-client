import React from "react";
import { Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

export const AppLayout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            {/* <Box sx={{ alignItems: 'flex-end' }}>
              <Tooltip title="Management">
                <Button
                  onClick={handleOpenMgmtMenu}
                  endIcon={<ArrowDropDown />}
                  sx={{ p: 0, color: 'common.white' }}
                >
                  Management
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseMgmtMenu}
              >
                {managementMenu.map((setting) => (
                  <MenuItem key={setting.title} onClick={setting.onClick}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Button sx={{ p: 0 }}>
                Logout
              </Button>
            </Box> */}
          </Toolbar>
        </Container>
      </AppBar>
      <Container
        maxWidth="xl"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};