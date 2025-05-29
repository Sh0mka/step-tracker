import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { EmojiEvents as TrophyIcon } from "@mui/icons-material";

// Моковые данные для примера
const leaderboardData = [
  { id: 1, name: "Алексей", steps: 15678, rank: 1 },
  { id: 2, name: "Мария", steps: 14567, rank: 2 },
  { id: 3, name: "Иван", steps: 13456, rank: 3 },
  { id: 4, name: "Елена", steps: 12345, rank: 4 },
  { id: 5, name: "Дмитрий", steps: 11234, rank: 5 },
];

const Leaderboard = () => {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mb: 8 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Топ ходоков
        </Typography>
        <List>
          {leaderboardData.map((user, index) => (
            <React.Fragment key={user.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: index < 3 ? "primary.main" : "grey.300",
                    }}
                  >
                    {index < 3 ? (
                      <TrophyIcon sx={{ color: "white" }} />
                    ) : (
                      <Typography>{user.rank}</Typography>
                    )}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={`${user.steps.toLocaleString()} шагов`}
                />
                <Typography variant="h6" color="primary">
                  #{user.rank}
                </Typography>
              </ListItem>
              {index < leaderboardData.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Leaderboard;
