import { expect } from "chai";

import { INewPokemon } from "../constants/Pokemon";
import { stubBlankGame } from "../../fakes";
import { FullScreenPokemon } from "../../FullScreenPokemon";

const pokemonTitle: string[] = "CHARMANDER".split("");

const setUpFSPandGeneratedNumber = (generatedNumber: number): FullScreenPokemon => {
    const fsp: FullScreenPokemon = stubBlankGame();
    fsp.modAttacher.enableMod("Random Held Items");
    fsp.numberMaker.randomReal1 = (): number => generatedNumber;
    return fsp;
};

describe("RandomHeldItemsMod", () => {
    it("gives a newly spawned Pokemon a random item when generated probability is valid", (): void => {
        // Arrange
        const fsp = setUpFSPandGeneratedNumber(0.012);
        const chosenInfo: INewPokemon = {
            level: 1,
            title: pokemonTitle
        };

        // Act
        const chosenPokemon = fsp.equations.newPokemon(chosenInfo);

        // Assert
        expect(chosenPokemon.item).to.deep.equal("Burn Heal".split(""));
    });

    it("does not give a newly spawned Pokemon a random item when generated probability is invalid", (): void => {
        // Arrange
        const fsp = setUpFSPandGeneratedNumber(1.15);
        const chosenInfo: INewPokemon = {
            level: 1,
            title: pokemonTitle
        };

        // Act
        const chosenPokemon = fsp.equations.newPokemon(chosenInfo);

        // Assert
        expect(chosenPokemon.item).to.be.equal(undefined);
    });
});
