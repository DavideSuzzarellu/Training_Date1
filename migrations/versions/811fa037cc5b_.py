"""empty message

Revision ID: 811fa037cc5b
Revises: 03f7f723fb83
Create Date: 2024-03-18 14:31:03.813723

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '811fa037cc5b'
down_revision = '03f7f723fb83'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trainers', schema=None) as batch_op:
        batch_op.drop_constraint('trainers_bank_iban_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trainers', schema=None) as batch_op:
        batch_op.create_unique_constraint('trainers_bank_iban_key', ['bank_iban'])

    # ### end Alembic commands ###
