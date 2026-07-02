import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
    console.error(err);
    if (
        typeof err === "object" &&
        err !== null &&
        "code" in err
    ) {
        const prismaError = err as { code: string; stack?: string };
        if (prismaError.code === 'P2025') {
            res.status(404).json({ error: 'Record not found' });
            return;
        }

        if (prismaError.code === 'P2002') {
            res.status(400).json({ error: 'A record with that value already exists' });
            return;
        }
    } 
  res.status(500).json({ error: 'Internal server error' });
};

export default errorHandler;