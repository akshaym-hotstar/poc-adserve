import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import {
  Button,
  ButtonGroup,
  Card,
  FormControl,
  TextField,
  Tooltip,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";

const EditCampaign = () => {
  const [startDate, setStartDate] = useState<null>();
  const [startTime, setStartTime] = useState<null>();
  const [endDate, setEndDate] = useState<null>();
  const [endTime, setEndTime] = useState<null>();

  return (
    <Box display="flex" flexDirection="row" columnGap={4}>
      <Box
        sx={{
          display: "flex",
          flexFlow: "column",
          rowGap: "16px",
          flexGrow: 1,
        }}
      >
        <Typography variant="h5" fontWeight={500}>
          Edit Campaign
        </Typography>
        {/* Campaign Title card */}
        <Card sx={{ display: "flex", flexFlow: "column", p: 2 }}>
          <Typography variant="h6">Campaign Title*</Typography>
          <Typography variant="caption">
            Select a Campaign Title that helps you identify and differentiate
            from others.
          </Typography>
          <TextField fullWidth margin="normal" />
        </Card>
        {/* Objective card */}
        <Card sx={{ display: "flex", flexFlow: "column", p: 2 }}>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            columnGap={1}
          >
            <Typography variant="h6">Objective</Typography>
            <Tooltip title="More Information">
              <InfoOutlinedIcon fontSize="small" color="action" />
            </Tooltip>
          </Box>
          <Typography variant="caption">
            Select a right objective for you campaign
          </Typography>
          <ButtonGroup
            variant="outlined"
            size="large"
            disableRipple
            disableElevation
            disableFocusRipple
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: 2,
            }}
          >
            <Button endIcon={<InfoOutlinedIcon />} fullWidth>
              Awareness
            </Button>
            <Button endIcon={<InfoOutlinedIcon />} fullWidth>
              Consideration
            </Button>
            <Button endIcon={<InfoOutlinedIcon />} fullWidth>
              Conversion
            </Button>
          </ButtonGroup>
        </Card>
        {/* Setup Campaign card */}
        <Card sx={{ display: "flex", flexFlow: "column", p: 2 }}>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            columnGap={1}
          >
            <Typography variant="h6">Budget & Schedule</Typography>
            <Tooltip title="More Information">
              <InfoOutlinedIcon fontSize="small" color="action" />
            </Tooltip>
          </Box>
          <hr />
          <FormControl sx={{ width: "500px" }} margin="normal">
            <TextField
              variant="standard"
              label="Pricing Model"
              helperText="Pricing model is automatically selected based on you campaign goal"
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl sx={{ width: "500px" }} required margin="normal">
            <TextField
              required
              type="number"
              variant="standard"
              label="Daily Budget"
              helperText="Actual amount spent may vary"
              InputLabelProps={{ shrink: true }}
              inputProps={{ inputMode: "numeric" }}
            />
          </FormControl>
          <FormControl sx={{ width: "500px" }} required margin="normal">
            <TextField
              required
              type="number"
              variant="standard"
              label="Bid CPM"
              InputLabelProps={{ shrink: true }}
              inputProps={{ inputMode: "numeric" }}
            />
          </FormControl>
          <Box
            marginTop={1}
            display="flex"
            alignItems="center"
            columnGap={1}
            sx={{
              background: "#fcf4eb",
              borderRadius: "4px",
              p: "8px",
              width: "fit-content",
            }}
          >
            <ThumbUpOutlinedIcon htmlColor="#e69138" fontSize="medium" />
            <Typography variant="body1">
              The best bid value on the platform is above 110. To outrank your
              competition try a higher bid value.
            </Typography>
          </Box>
          <Typography variant="h6" marginTop={4}>
            Schedule Campaign*
          </Typography>
          <hr />
          <Box display="flex" flexDirection="column" rowGap={2} marginY={2}>
            <Typography variant="body1" fontWeight="500">
              Campaign Start Date and Start Time
            </Typography>
            <Box display="flex" justifyContent="flex-start" columnGap={4}>
              <DatePicker
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={{ width: "300px" }}
                  />
                )}
              />
              <TimePicker
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" rowGap={2} marginY={2}>
            <Typography variant="body1" fontWeight="500">
              Campaign End Date and End Time
            </Typography>
            <Box display="flex" justifyContent="flex-start" columnGap={4}>
              <DatePicker
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={{ width: "300px" }}
                  />
                )}
              />
              <TimePicker
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </Box>
          </Box>
        </Card>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        rowGap={2}
        padding={2}
        marginTop={4}
        height="fit-content"
        width="300px"
        borderRadius={1}
        sx={{ background: "#fff" }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="body1" fontWeight={500} fontSize={14}>
            Selected ad format:
          </Typography>
          <Typography fontSize={14}>Carousel Ad</Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="body1" fontWeight={500} fontSize={14}>
            Design recommendations:
          </Typography>
          <ul
            style={{
              marginTop: 0,
              marginBottom: 0,
              fontSize: "12px",
              paddingLeft: "24px",
            }}
          >
            <li>File type: JPG or PNG or GIF</li>
            <li>Ratio: 1:1 (a square image)</li>
            <li>Resolution: 1000 x 1000 pixels</li>
          </ul>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="body1" fontWeight={500} fontSize={14}>
            Technical specifications:
          </Typography>
          <ul
            style={{
              marginTop: 0,
              marginBottom: 0,
              fontSize: "12px",
              paddingLeft: "24px",
            }}
          >
            <li>Width: 1000 pixels</li>
            <li>Height: 1000 pixels</li>
          </ul>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="body1" fontWeight={500} fontSize={14}>
            Text recommendations:
          </Typography>
          <ul
            style={{
              marginTop: 0,
              marginBottom: 0,
              fontSize: "12px",
              paddingLeft: "24px",
            }}
          >
            <li>Caption: 50-60 characters</li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
};

export { EditCampaign };
