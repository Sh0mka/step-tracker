import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  Divider,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

const Referral = () => {
  // Моковые данные рефералов
  const referrals = [
    { id: 1, name: "Мария", joinedDate: "2024-03-15", status: "Активен" },
    { id: 2, name: "Иван", joinedDate: "2024-03-14", status: "Активен" },
    { id: 3, name: "Елена", joinedDate: "2024-03-13", status: "Неактивен" },
  ];

  const referralLink = "https://steptracker.com/ref/123456";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Ссылка скопирована!");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mb: 8 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Пригласите друзей
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            За каждого приглашенного друга вы получаете бонусные шаги!
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              value={referralLink}
              variant="outlined"
              size="small"
              InputProps={{ readOnly: true }}
            />
            <Button
              variant="contained"
              startIcon={<CopyIcon />}
              onClick={handleCopyLink}
            >
              Копировать
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Ваши рефералы
        </Typography>
        <List>
          {referrals.map((referral, index) => (
            <React.Fragment key={referral.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={referral.name}
                  secondary={`Присоединился: ${referral.joinedDate}`}
                />
                <Typography
                  variant="body2"
                  color={
                    referral.status === "Активен"
                      ? "success.main"
                      : "text.secondary"
                  }
                >
                  {referral.status}
                </Typography>
              </ListItem>
              {index < referrals.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Referral;
