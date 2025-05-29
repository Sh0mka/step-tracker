import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { DirectionsWalk as WalkIcon } from "@mui/icons-material";
import StepCounter from "../services/StepCounter";

const Dashboard = () => {
  const [steps, setSteps] = useState(0);
  const [dailyGoal] = useState(10000);
  const [progress, setProgress] = useState(0);
  const [showPermissionAlert, setShowPermissionAlert] = useState(false);
  const [stepCounter, setStepCounter] = useState<StepCounter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateSteps = useCallback(
    (newSteps: number) => {
      setSteps(newSteps);
      setProgress((newSteps / dailyGoal) * 100);
    },
    [dailyGoal]
  );

  useEffect(() => {
    setIsLoading(true);

    // Сначала инициализируем счетчик без запроса разрешений
    const counter = new StepCounter();
    counter.onStep(updateSteps);
    setStepCounter(counter);
    setIsLoading(false);

    // Затем асинхронно запрашиваем разрешения
    const requestPermissions = async () => {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function"
      ) {
        try {
          const permissionState = await (
            DeviceMotionEvent as any
          ).requestPermission();
          if (permissionState !== "granted") {
            setShowPermissionAlert(true);
          }
        } catch {
          setShowPermissionAlert(true);
        }
      }
    };

    requestPermissions();

    return () => {
      if (stepCounter) {
        stepCounter.destroy();
      }
    };
  }, [updateSteps]);

  const handleResetSteps = () => {
    if (stepCounter) {
      stepCounter.resetSteps();
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mb: 8 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <WalkIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
            <Typography variant="h4" component="div">
              {steps.toLocaleString()}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            шагов сегодня
          </Typography>
          <Box sx={{ position: "relative", display: "inline-flex", mt: 2 }}>
            <CircularProgress
              variant="determinate"
              value={progress}
              size={120}
              thickness={4}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >
                {`${Math.round(progress)}%`}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Цель</Typography>
            <Typography variant="h4" color="primary">
              {dailyGoal.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              шагов в день
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Осталось</Typography>
            <Typography variant="h4" color="primary">
              {Math.max(0, dailyGoal - steps).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              шагов до цели
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" fullWidth onClick={handleResetSteps}>
          Сбросить счетчик
        </Button>
      </Box>

      <Snackbar
        open={showPermissionAlert}
        autoHideDuration={6000}
        onClose={() => setShowPermissionAlert(false)}
      >
        <Alert severity="warning" onClose={() => setShowPermissionAlert(false)}>
          Для подсчета шагов необходимо разрешить доступ к акселерометру
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
