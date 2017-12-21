import { expect } from "chai";
import { spy } from "sinon";

import { stubBlankGame } from "../fakes";
import { FullScreenPokemon } from "../FullScreenPokemon";
import { IPlayer, IThing } from "./Things";
import { Direction } from "./Constants";

describe("Inputs", () => {
    describe("keyDownA", () => {
        it("activates a bordering activatable solid", (): void => {
            // Arrange
            const fsp: FullScreenPokemon = stubBlankGame();
            const player: IPlayer = fsp.things.add("Player") as IPlayer;
            const solid: IThing = fsp.things.add("FenceWide") as IThing;

            solid.activate = spy();
            fsp.actions.animateCharacterSetDirection(player, Direction.Top);
            fsp.physics.setMidXObj(player, solid);
            fsp.physics.setTop(player, solid.bottom);
            player.bordering[player.direction] = solid;

            // Act
            fsp.inputs.keyDownA(player);

            // Assert
            expect(solid.activate).to.have.been.called;
        });

        it("does not activate a non-bordering activatable solid", (): void => {
            // Arrange
            const fsp: FullScreenPokemon = stubBlankGame();
            const player: IPlayer = fsp.things.add("Player") as IPlayer;
            const solid: IThing = fsp.things.add("FenceWide") as IThing;

            solid.activate = spy();
            fsp.actions.animateCharacterSetDirection(player, Direction.Top);
            fsp.physics.setMidXObj(player, solid);
            fsp.physics.setTop(player, solid.bottom + player.height);

            // Act
            fsp.inputs.keyDownA(player);

            // Assert
            expect(solid.activate).to.not.have.been.called;
        });
    });
});
