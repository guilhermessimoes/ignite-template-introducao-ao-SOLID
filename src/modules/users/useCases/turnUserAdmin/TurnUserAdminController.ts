import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
    constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

    handle(request: Request, response: Response): Response {
        const { admin } = request.body;

        this.turnUserAdminUseCase.execute({ admin });

        return response.status(201).json();
    }
}

export { TurnUserAdminController };
