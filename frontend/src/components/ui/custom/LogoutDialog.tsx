// src/components/global/LogoutDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeLogoutDialog } from "@/redux/user/dialogSlice";
import { Button } from "../button";
import { useLogoutMutation } from "@/redux/user/authAPI";
import { logout } from "@/redux/user/authSlice";
import { toast } from "sonner";

const LogoutDialog = () => {
  const isOpen = useSelector(
    (state: RootState) => state.dialog.isLogoutDialogOpen
  );
  const dispatch = useDispatch();
  const [logoutAction] = useLogoutMutation();

  const handleConfirm = async () => {
    try {
      await logoutAction().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      dispatch(closeLogoutDialog());
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && dispatch(closeLogoutDialog())}
    >
      <DialogContent className="bg-white shadow-xl">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to logout?</p>
        <DialogFooter>
          <Button
            className="text-white"
            onClick={() => dispatch(closeLogoutDialog())}
          >
            Cancel
          </Button>
          <Button
            className="text-white"
            onClick={handleConfirm}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
