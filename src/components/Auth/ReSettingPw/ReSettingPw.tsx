import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import useStore from '@src/hooks/useStore';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from 'react-router-dom';

const ReSettingPw = () => {
  const nav = useNavigate();
  const { AuthStore } = useStore();

  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');

  const handleChangeTextFiled = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.name === 'newPassword') {
      setNewPassword(event.target.value);
    } else if (event.target.name === 'newPasswordConfirm') {
      setNewPasswordConfirm(event.target.value);
    }
  };

  const handleClickChangeBtn = async () => {
    try {
      await AuthStore.changePassword(newPassword, newPasswordConfirm);
      setMessage('비밀번호 변경에 성공하였습니다');
      handleClickOpen();
    } catch (error) {
      setMessage('비밀번호 변경에 실패하였습니다');
      handleClickOpen();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickHomeBtn = () => {
    nav('/');
  };

  return (
    <>
      <div>
        <Button onClick={handleClickHomeBtn}>Home으로</Button>
        <TextField
          autoComplete="off"
          autoFocus
          required
          className="newPassword"
          id="newPassword"
          name="newPassword"
          type="newPassword"
          fullWidth
          variant="standard"
          placeholder="기존 비밀번호 입력"
          margin="normal"
          onChange={handleChangeTextFiled}
        />
        <TextField
          autoComplete="off"
          required
          className="newPasswordConfirm"
          id="newPasswordConfirm"
          name="newPasswordConfirm"
          type="newPasswordConfirm"
          fullWidth
          variant="standard"
          placeholder="변경할 비밀번호 입력"
          margin="normal"
          onChange={handleChangeTextFiled}
        />
      </div>
      <ChangePwBtnDiv>
        <Button onClick={handleClickChangeBtn}>비밀번호 변경</Button>
      </ChangePwBtnDiv>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <Button onClick={handleClose}>닫기</Button>
      </Dialog>
    </>
  );
};

const ChangePwBtnDiv = styled('div')`
  margin: 0 0 0 27em;
`;

export default ReSettingPw;
