import { Request, Response } from "express";
import { emailSchema, recoverySchema, registerSchema } from "../validations";
import authService from "../services/user.service";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const {
        error,
        value: { email, password },
      } = registerSchema.validate(req.body);

      if (error) {
        res.status(400).json({
          message: "Validation error",
          details: error.details.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
        return;
      }
      const data = await authService.register(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.status(500).json({ message: errorMessage });
    }
  }
  async activation(req: Request, res: Response) {
    try {
      const { id: userId } = req.params;
      await authService.activation(userId);
      res.redirect(`${process.env.CLIENT_URL}/success/${userId}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.status(500).json({ message: errorMessage });
    }
  }

  async setActivation(req: Request, res: Response) {
    try {
      const { id: userId } = req.params;
      await authService.activation(userId);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.status(500).json({ message: errorMessage });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const {
        error,
        value: { email, password },
      } = registerSchema.validate(req.body);

      if (error) {
        res.status(400).json({
          message: "Validation error",
          details: error.details.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
        return;
      }
      const data = await authService.login(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.status(500).json({ message: errorMessage });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Success", token });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.status(500).json({ message: errorMessage });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.status(500).json({ message: errorMessage });
    }
  }
  async forgotPassword(req: Request, res: Response) {
    try {
      const {
        error,
        value: { email },
      } = emailSchema.validate(req.body);

      if (error) {
        res.status(400).json({
          message: "Validation error",
          details: error.details.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
        return;
      }

      await authService.forgotPassword(email);
      res.status(200).json({ message: "Success" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.status(500).json({ message: errorMessage });
    }
  }

  async recoveryAccount(req: Request, res: Response) {
    try {
      const {
        error,
        value: { token, password },
      } = recoverySchema.validate(req.body);

      if (error) {
        res.status(400).json({
          message: "Validation error",
          details: error.details.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
        return;
      }

      await authService.recoveryAccount(token, password);
      res.status(200).json({ message: "Success" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";

      res.status(500).json({ message: errorMessage });
    }
  }
}

export default new AuthController();
