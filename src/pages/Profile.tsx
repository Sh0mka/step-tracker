import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";

const Profile = () => {
  // Моковые данные пользователя
  const userData = {
    name: "Алексей",
    totalSteps: 156789,
    rank: 1,
    level: 5,
    achievements: 3,
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mb: 8 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "primary.main",
                mr: 2,
              }}
            >
              <PersonIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h5">{userData.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Уровень {userData.level}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Всего шагов</Typography>
            <Typography variant="h4" color="primary">
              {userData.totalSteps.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Достижения</Typography>
            <Typography variant="h4" color="primary">
              {userData.achievements}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{ mb: 2 }}
          onClick={() => {
            // Здесь будет логика синхронизации с устройством
            alert("Синхронизация с устройством");
          }}
        >
          Синхронизировать шаги
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => {
            // Здесь будет логика настроек
            alert("Настройки");
          }}
        >
          Настройки
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
