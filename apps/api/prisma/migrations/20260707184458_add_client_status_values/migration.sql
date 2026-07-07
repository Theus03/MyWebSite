-- AlterEnum
-- Adiciona os novos estágios do funil em uma migration própria: o Postgres exige
-- que um valor novo de enum seja commitado antes de poder ser usado (ex: como
-- DEFAULT de coluna) em outra transação — por isso essa migration só adiciona os
-- valores, e a próxima (kanban_funnel) é quem usa "PROSPECCAO" como default.
ALTER TYPE "ClientStatus" ADD VALUE 'PROSPECCAO';
ALTER TYPE "ClientStatus" ADD VALUE 'NEGOCIACAO';
ALTER TYPE "ClientStatus" ADD VALUE 'MANUTENCAO';
