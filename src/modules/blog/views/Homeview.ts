import { z } from "zod/v4";
import { _z } from "../../../core/renderer/Views.ts";

const HomeDataSchema = z.object({ name: z.string() });

export const Homeview = (data: unknown) => {
    const { name } = HomeDataSchema.parse(data);
    const _ = _z.section(_z.p(`Hello ${name}`));
    return _;
};