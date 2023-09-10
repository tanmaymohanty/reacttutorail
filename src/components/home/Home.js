import React, { useState } from 'react';
import { Paper, TableContainer } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { addSkills, deleteSkill, updateSkill } from '../../store/slice/skillsSlice';
import Header from '../header/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [calendar, setCalendar] = useState('');
  const [skills, setSkills] = useState('');
  const [status, setStatus] = useState('');
  const [editing, setEditing] = useState(null);
  const [errors, setErrors] = useState({ calendar: '', skills: '', status: '' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const validateForm = () => {
    let formIsValid = true;
    let newErrors = { calendar: '', skills: '', status: '' };

    if (!calendar) {
      formIsValid = false;
      newErrors.calendar = 'Date is required.';
    }

    if (!skills) {
      formIsValid = false;
      newErrors.skills = 'Skills are required.';
    }

    if (status.length < 2) {
      formIsValid = false;
      newErrors.status = 'Status should be at least 2 characters long.';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleClickOpen = (skill) => {
    if (skill) {
      setCalendar(skill.calendar);
      setSkills(skill.skills);
      setStatus(skill.status);
      setEditing(skill);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setCalendar('');
    setSkills('');
    setStatus('');
    setErrors({ calendar: '', skills: '', status: '' });  // Reset errors
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (validateForm()) {
      const skillsData = { calendar, skills, status, id: editing?.id };

      if (editing) {
        dispatch(updateSkill(skillsData));
        toast.success('Skill updated successfully!');
        setEditing(null);
      } else {
        dispatch(addSkills(skillsData));
        toast.success('Skill added successfully!');
      }

      setOpen(false);

      // Reset form after successful submission
      setCalendar('');
      setSkills('');
      setStatus('');
      setErrors({ calendar: '', skills: '', status: '' });  // Reset errors
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteSkill(id));
    setDeleteDialogOpen(false);
  };

  const skillsData = useSelector((state) => state.skills.skills);
  const sortedSkillsData = [...skillsData].sort((a, b) => {
    return new Date(b.calendar) - new Date(a.calendar);
  });

  return (
    <div>
      <ToastContainer />
      <Header />
      <h1>Welcome to Pool-emp</h1>
      <p>Your one-stop solution for managing pools and employees!</p>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <Button variant='contained' color="secondary" onClick={() => handleClickOpen(null)}>Add Status</Button>
        </div>
      </div>
      <Paper elevation={5} sx={{ width: '80%', margin: 'auto' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f3f3f3' }}>Date</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f3f3f3' }}>Skills</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f3f3f3' }}>Status</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f3f3f3' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedSkillsData.map((skill, index) => (
                <TableRow key={index}>
                  <TableCell>{skill.calendar}</TableCell>
                  <TableCell>{skill.skills}</TableCell>
                  <TableCell>{skill.status}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleClickOpen(skill)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => {
                      setSkillToDelete(skill);
                      setDeleteDialogOpen(true);
                    }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Status' : 'Add Status'}</DialogTitle>
        <DialogContent style={{ padding: '16px' }}>
          <DialogContentText style={{ fontWeight: 'bold', color: '#333' }}>
            Please enter the status details here.
          </DialogContentText>
          <form style={{ padding: '16px' }}>
            <TextField
              label="Calendar"
              type="date"
              fullWidth
              value={calendar}
              onChange={(e) => setCalendar(e.target.value)}
              InputLabelProps={{ shrink: true }}
              helperText={errors.calendar}
              error={!!errors.calendar}
              inputProps={{
                max: new Date().toISOString().split("T")[0],
              }}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Skills"
              fullWidth
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              helperText={errors.skills}
              error={!!errors.skills}
              style={{ marginBottom: '16px' }}
            />
            <TextField
              label="Status"
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              helperText={errors.status}
              error={!!errors.status}
              style={{ marginBottom: '16px' }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{editing ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this skill?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(skillToDelete.id);
              toast.success('Skill deleted successfully!');
              setDeleteDialogOpen(false);
              setSkillToDelete(null);
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;