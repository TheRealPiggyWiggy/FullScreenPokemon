import { expect } from "chai";

import { FullScreenPokemon } from "../FullScreenPokemon";
import { ICharacter } from "./Things";
import { stubBlankGame } from "../fakes";

const stubCharacterType: [string, any] = ["Lady", {
    width: 8,
    height: 12
}];

describe("Collisions", () => {
    describe("isCharacterTouchingCharacter", () => {
        it("returns true when characters are touching", (): void => {
            // Arrange
            const fsp: FullScreenPokemon = stubBlankGame();
            const isCharacterTouchingCharacter = fsp.collisions.generateIsCharacterTouchingCharacter();
            const a: ICharacter = fsp.things.add(stubCharacterType) as ICharacter;
            const b: ICharacter = fsp.things.add(stubCharacterType) as ICharacter;

            fsp.physics.setTop(b, a.bottom);

            // Act
            const touching: boolean = isCharacterTouchingCharacter(a, b);

            // Assert
            expect(touching).to.be.equal(true);
        });

        it("returns false when characters aren't touching", (): void => {
            // Arrange
            const fsp: FullScreenPokemon = stubBlankGame();
            const isCharacterTouchingCharacter = fsp.collisions.generateIsCharacterTouchingCharacter();
            const a: ICharacter = fsp.things.add(stubCharacterType) as ICharacter;
            const b: ICharacter = fsp.things.add(stubCharacterType) as ICharacter;

            fsp.physics.setTop(b, a.bottom + 28);

            // Act
            const touching: boolean = isCharacterTouchingCharacter(a, b);

            // Assert
            expect(touching).to.be.equal(false);
        });

        it("returns false when a character is following another", (): void => {
            // Arrange
            const fsp: FullScreenPokemon = stubBlankGame();
            const isCharacterTouchingCharacter = fsp.collisions.generateIsCharacterTouchingCharacter();
            const a: ICharacter = fsp.things.add(stubCharacterType) as ICharacter;
            const b: ICharacter = fsp.things.add(stubCharacterType) as ICharacter;

            fsp.physics.setTop(b, a.bottom);
            fsp.actions.following.startFollowing(b, a);

            // Act
            const touching: boolean = isCharacterTouchingCharacter(a, b);

            // Assert
            expect(touching).to.be.equal(false);
        });
    });
});
