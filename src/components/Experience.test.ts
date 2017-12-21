import { expect } from "chai";

import { stubBlankGame } from "../fakes";
import { FullScreenPokemon } from "../FullScreenPokemon";
import { IPokemonEvolution, IPokemonEvolutionByLevel } from "./constants/Pokemon";
import { IPokemon } from "./Battles";

describe("Experience", () => {
    it("evolves a Pokemon at exactly its level requirement", (): void => {
        // Arrange
        const fsp: FullScreenPokemon = stubBlankGame();
        const pokemonTitle: string[] = "CHARMANDER".split("");
        const evolutions: IPokemonEvolution[] = fsp.constants.pokemon.byName[pokemonTitle.join("")].evolutions!;
        const pokemonLevel: number = (evolutions[0].requirements[0] as IPokemonEvolutionByLevel).level - 1;

        // Act
        const pokemon: IPokemon = fsp.equations.newPokemon({
            level: pokemonLevel,
            title: pokemonTitle
        });
        fsp.experience.levelup(pokemon);

        // Assert
        expect(pokemon.title.toString()).to.be.equal("CHARMELEON".split("").toString());
    });

    it("evolves a Pokemon that exceeds its level requirement", (): void => {
        // Arrange
        const fsp: FullScreenPokemon = stubBlankGame();
        const pokemonTitle: string[] = "CHARMANDER".split("");
        const evolutions: IPokemonEvolution[] = fsp.constants.pokemon.byName[pokemonTitle.join("")].evolutions!;
        const pokemonLevel: number = (evolutions[0].requirements[0] as IPokemonEvolutionByLevel).level + 1;

        // Act
        const pokemon: IPokemon = fsp.equations.newPokemon({
            level: pokemonLevel,
            title: pokemonTitle
        });
        fsp.experience.levelup(pokemon);

        // Assert
        expect(pokemon.title.toString()).to.be.equal("CHARMELEON".split("").toString());
    });

    it("does not evolve a Pokemon that has not yet reached its level requirement", (): void => {
        // Arrange
        const fsp: FullScreenPokemon = stubBlankGame();
        const pokemonTitle: string[] = "CHARMANDER".split("");
        const evolutions: IPokemonEvolution[] = fsp.constants.pokemon.byName[pokemonTitle.join("")].evolutions!;
        const pokemonLevel: number = (evolutions[0].requirements[0] as IPokemonEvolutionByLevel).level - 2;

        // Act
        const pokemon: IPokemon = fsp.equations.newPokemon({
            level: pokemonLevel,
            title: pokemonTitle
        });
        fsp.experience.levelup(pokemon);

        // Assert
        expect(pokemon.title.toString()).to.be.equal("CHARMANDER".split("").toString());
    });
});
