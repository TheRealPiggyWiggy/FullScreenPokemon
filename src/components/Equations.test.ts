import { expect } from "chai";

import { FullScreenPokemon } from "../FullScreenPokemon";
import { stubBlankGame } from "../fakes";
import { IPokemon } from "./Battles";

const pokemonTitle: string[] = "CHARMANDER".split("");

describe("Equations", () => {
    describe("newPokemon", () => {
        it("gives a new Pokemon a provided item", (): void => {
            // Arrange
            const fsp: FullScreenPokemon = stubBlankGame();
            const chosenItem = "Potion".split("");

            // Act
            const pokemon: IPokemon = fsp.equations.newPokemon({
                level: 1,
                title: pokemonTitle,
                item: chosenItem
            });

            // Assert
            expect(pokemon.item).to.deep.equal(chosenItem);
        });
    });
});
